import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { ApiTags } from "@nestjs/swagger"

@ApiTags("Users")
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Get('')
    getUsers(){
        return this.userService.getAllUsers();
    }

    @Get(':id')
    findUser(
        @Param('id') id: string,
    ){
        return this.userService.findUserById(id);
    }

    @Patch('update/:id')
    updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ){
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete('delete/:id')
    removeUser(
        @Param('id') id: string
    ){
        return this.userService.removeUser(id);
    }
}
