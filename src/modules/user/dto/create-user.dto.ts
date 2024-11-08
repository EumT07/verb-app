import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { UserRole } from './roles.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({
        description: 'Username',
        example: 'jhon45',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsOptional()
    readonly role: UserRole.USER;
    
    @ApiProperty({
        description: 'User email',
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