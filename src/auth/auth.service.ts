import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async register(user: RegisterUserDto) {
    const doesUserExists = await this.userService.findUserWithEmail(user.email);
    if (doesUserExists) {
      throw new ConflictException('user already exists');
    }

    return this.userService.createUser(user);
  }

  async login(user: LoginUserDto) {
    const currentUser = await this.userService.findUserWithEmail(user.email);

    if (!currentUser) {
      throw new NotFoundException('user not found');
    }

    if (user.password !== currentUser.password) {
      throw new BadRequestException('invalid credentials');
    }

    return currentUser;
  }
}
