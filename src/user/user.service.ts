import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findUserWithEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  findUserWithId(userId: number) {
    return this.prisma.user.findFirst({ where: { id: userId } });
  }

  async getUsers() {
    return this.prisma.user.findMany({ where: { role: Role.WORKER } });
  }

  async createUser(user: any) {
    const oldUser = await this.findUserWithEmail(user.email);

    if (oldUser) throw new ConflictException('user already exists');

    const response = await this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });

    return response;
  }

  async updateUser(userId: number, user: Partial<UpdateUserDto>) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...user,
      },
    });
  }

  async removeUser(userId: number) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async addServiceToUser(userId: number, serviceIds: string[]) {
    try {
      const response = await this.prisma.user.update({
        where: { id: userId },
        data: {
          Services: {
            connect: serviceIds.map((id) => ({ id: parseInt(id) })),
          },
        },
      });

      return response;
    } catch (err) {
      throw new BadRequestException('something went wrong', err.message);
    }
  }
}
