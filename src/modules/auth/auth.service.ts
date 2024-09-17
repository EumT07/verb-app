import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { EmailDto, LoginDto, ResetPasswordDto } from './dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async login({email, password}: LoginDto){
        try {
            console.log("Email: ", email);
            console.log("Password: ", password); 
        } catch (error) {
            throw new NotFoundException("Invalid Credentials");
        }
    }
    async createEmailToken({email}: EmailDto){
        try {
            console.log("Email: ",email);
            
        } catch (error) {
            throw new NotFoundException(error.message)
        }
    }
    async resetPassword(userId: string, {newPassword, newConfirmPassword}: ResetPasswordDto){
        try {
            if(newPassword !== newConfirmPassword){
                throw new HttpException("Password are different", HttpStatus.NOT_FOUND)
            }

            console.log(`
                password: ${newPassword}\n
                confirmPassword: ${newConfirmPassword}\n
                userId: ${userId}
                `);
            
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
