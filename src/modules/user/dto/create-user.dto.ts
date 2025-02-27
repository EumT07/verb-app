import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { UserRole } from './roles.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({
        description: 'You can create an username, which allows you to identify yourself within the app, try to create a username, which you can remember, avoid creating excessively long or complicated, or offensive names, also avoid placing personal or sensitive information in the username.',
        example: 'jhon45 - spider87 - thor23',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsOptional()
    readonly role: UserRole.USER;
    
    @ApiProperty({
        description: 'You can create an email, which allows you to identify yourself within the application, the email can be for personal use, or a secondary email, but remember that you must have full control of your email, because the app will be able to communicate with you, in case of loss of your credentials, you can change your email according to our terms.',
        example: 'jhoncena@gmail.com',
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
            description:'Password must contain min 8 character at least 1 uppercase, 1 lowercase, 1 number and 1 special character (@$!%*?&.)',
            example: 'jhonCena.1234',
    })
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=(?:.*[0-9]){1})(?=(?:.*[a-z]){1})(?=(?:.*[A-Z]){1})(?=(?:.*[@$!%*?&.]){1})[A-Za-z0-9@$!%*?&.]{8,}$/,
        {message:'Password must contain min 8 character at least 1 uppercase, 1 lowercase, 1 number and 1 special character (@$!%*?&.)',},
    )
    password: string;
}