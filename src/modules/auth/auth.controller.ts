import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { loginPostApi, recoveryPassPostApi, registerUserPostApi, resetPassPostApi } from 'src/docs/auth-api/index';
import { CreateUserDto } from '../user/dto';
import { EmailDto, LoginDto, ResetPasswordDto } from './dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ){}

    @Post('signup')
    @registerUserPostApi()
    signUp(
        @Body() createUserDto: CreateUserDto
    ){
        return this.userService.createUser(createUserDto);
    }

    @Post('login')
    @loginPostApi()
    login(
        @Body() loginDto: LoginDto
    ){
        return this.authService.login(loginDto)
    }

    @Post('recoverypass')
    @recoveryPassPostApi()
    searchEmail(
        @Body() emailDto: EmailDto
    ){
        return this.authService.createEmailToken(emailDto);
    }

    @Patch('resetpass/:id')
    @resetPassPostApi()
    recoveryPassword(
        @Param('id') id: string,
        @Body() passwordDto: ResetPasswordDto
    ){
        return this.authService.resetPassword(id, passwordDto)
    }
}
