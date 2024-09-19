import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { EmailDto, LoginDto, ResetPasswordDto } from './dto';
import { comparePassword, encryptPassword } from 'src/shared/utils/index';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ){}

    async login({email, password}: LoginDto){
        try {
            let user: { id:string, password:string, role:string}

            //Searching user
            user = await this.prismaService.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    password: true,
                    role: true
                }
            })

            if(!user) {
                throw new UnauthorizedException('Invalid Credentials');
            }

            const isPasswordCorrect = comparePassword(password,user.password);

            if(!isPasswordCorrect){
                throw new UnauthorizedException("Invalid Credentials")
            }

            //Creating Token
            const payload = {id: user.id, role: user.role}

            const token = await this.jwtService.signAsync(payload);

            return{
                status: 201,
                token
            }

        } catch (error) {
            throw new NotFoundException("Invalid Credentials");
        }
    }
    async createEmailToken({email}: EmailDto){
        try {
            let user: {id:string, email:string, username:string, firstName:string, lastName:string};

            user = await this.prismaService.user.findUnique({
                where: { email},
                select: {
                    id: true,
                    email: true,
                    username: true,
                    firstName: true,
                    lastName: true
                },
            });
        
            if (!user) {
                throw new UnauthorizedException('Invalidad Email');
            }
        
            //Sent email

            return {
                ok: "true",
                status: "201",
                message: "We have sent you an email to recovery your password.!!"
            };


        } catch (error) {
            throw new NotFoundException(error.message)
        }
    }
    async resetPassword(userId: string,  {newPassword, newConfirmPassword}: ResetPasswordDto){
        try {
            if(newPassword !== newConfirmPassword){
                throw new HttpException("Password are different", HttpStatus.NOT_FOUND)
            }

            //Password hashed
            const passwordHashed = encryptPassword(newPassword);

            await this.prismaService.user.update({
                where: { id: userId },
                data: { password: passwordHashed }
            })

            return {
                ok: 'true',
                status: '201',
                message: 'Your Password has been changed!!',
            };
            
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
