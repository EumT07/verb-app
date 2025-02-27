import { IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { UserRole } from './roles.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

    @ApiProperty({
        description: 'username',
        example: 'jhon45',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'First Name',
        example: 'Jhon',
    })
    @IsString()
    @IsOptional()
    firstName: string;

    @ApiProperty({
        description: 'Last Name',
        example: 'Cena',
    })
    @IsString()
    @IsOptional()
    lastName: string;

    @ApiProperty({
        description: 'User gender',
        example: 'Female / Male / ',
    })
    @IsString()
    @IsOptional()
    genre?: string;

    @IsString()
    @IsOptional()
    readonly role: UserRole.USER;

    @ApiProperty({
        description: "Birth Day",
        example: "10/08/2000"
    })
    @IsString()
    @IsOptional()
    birth: string

    @ApiProperty({
        description: 'User Country',
        example: 'Venezuela',
    })
    @IsString()
    @IsOptional()
    country: string;

}