import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/shared/utils/index';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
    constructor (
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ){}

    async createUser({password, email, username, role}: CreateUserDto){
        try {
            // Password hashed
            const passwordHashed = encryptPassword(password);

            //Check Username
            const usernameExists = await this.prismaService.user.findUnique({
                where: { username },
            });

            if(usernameExists){
                throw new BadRequestException("Username already Exists")
            }

            //Check Email
            const emailExists = await this.prismaService.user.findUnique({
                where: { email },
            });

            if(emailExists){
                throw new BadRequestException("Email already Exists")
            }
            
            // Creating user
            const user = await this.prismaService.user.create({
                data: {
                    email,
                    username,
                    role,
                    password: passwordHashed
                },
            });

            //Creating Token
            // 1: Pyload
            const payload = {id: user.id, role: user.role}
            // 2: Token
            const token = await this.jwtService.signAsync(payload)

            //Todo: Welcome Email Message

            return {
                status: 201,
                message: "User Created Successfuly",
                token
            }
            
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code == 'P2002') {
                    throw new InternalServerErrorException(error.code,error.message)
                }
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async getAllUsers(){
        try {
            //Get all users

            const users = await this.prismaService.user.findMany()

            return {
                status: "201",
                length: users.length,
                users: users
            }
            
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findUserById(id: string){
        try {
            const user = await this.prismaService.user.findUnique({
                where: { id }
            });

            if (!user) {
                throw new NotFoundException(`User not found`);
            }

            return {
                status: 201,
                message: "User Found Successfuly",
                user: user
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateUser(id: string, { birth, ...updateUserDto}: UpdateUserDto){
        try {
            let newUserName: string;
            let birthday = new Date(birth)
            
            const user = await this.prismaService.user.findUnique({
                where: { id }
            });

            if (!user) {
                throw new NotFoundException(`User not found`);
            }

            if (user.username !== updateUserDto.username) {
                newUserName = updateUserDto.username;
            }else {
                // newUserName = user.username;
                throw new NotFoundException(`Username already exists`);
            }

            const userUpdated = await this.prismaService.user.update({
                where: { id },
                data: {
                    username: newUserName,
                    birth: birthday,
                    ...updateUserDto
                }
            });

            return {
                status: 201,
                message: 'User updated successfully',
                userInfo: userUpdated,
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message);
            
        }
    }

    async removeUser(id: string){
        try {

            //Find user
            const user = await this.prismaService.user.findUnique({
                where: { id }
            })

            if(!user) {
                throw new NotFoundException("User not found");
            }

            await this.prismaService.user.delete({
                where: { id }
            })

            return {
                status: 204,
                message: `User was removed`
            }
        } catch (error) {
            throw new InternalServerErrorException("Failed to remove user", error.message);
        }
    }
}

