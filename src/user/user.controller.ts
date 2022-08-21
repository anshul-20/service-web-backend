import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { IsAdmin } from 'src/common/guards/IsAdmin.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllUsers(): Promise<UserDto[]> {
    const response = await this.userService.getUsers();

    return response.map((user) => {
      return new UserDto({ ...user });
    });
  }

  @Get('/current')
  async getCurrentUser(@Req() req: Request) {
    return req.currentUser;
  }

  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(body);

    return new UserDto({ ...user });
  }

  // @IsAdmin()
  // @Patch('/update/:id')
  // async updateUser(
  //   @Param('id') id: string,
  //   @Body() body: Partial<CreateUserDto>,
  // ) {
  //   const user = await this.userService.findUserWithId(parseInt(id));

  //   if (!user) {
  //     throw new BadRequestException('user does not exists');
  //   }

  //   return this.userService.updateUser(parseInt(id), body);
  // }

  // @IsAdmin()
  // @Delete('/delete/:id')
  // async deleteUser(@Param('id') id: string) {
  //   // ADD CONSTRAINS ON ALL FOREIGN KEYS
  //   const user = await this.userService.findUserWithId(parseInt(id));
  //   if (!user) {
  //     throw new BadRequestException('user does not exists');
  //   }

  //   return this.userService.removeUser(parseInt(id));
  // }

  // @IsAdmin()
  // @Patch('/add/service')
  // async addServiceToUser(
  //   @Body() body: { serviceIds: string[]; userId: string },
  // ) {
  //   console.log(body.serviceIds);

  //   return this.userService.addServiceToUser(
  //     parseInt(body.userId),
  //     body.serviceIds,
  //   );
  // }
}
