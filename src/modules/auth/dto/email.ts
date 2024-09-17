import { IsEmail } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class EmailDto {
    @ApiProperty({
        description: 'User email',
        example: 'jhoncena@gmail.com',
    })
    @IsEmail()
    email: string
}