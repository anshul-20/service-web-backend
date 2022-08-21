import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthenticatedUserDto } from './dto/authenticatedUser.dto';
import { SessionService } from './session.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
  ) {}
  @Post('/register')
  async registerUser(
    @Body() body: RegisterUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const newUser = await this.authService.register(body);
    const newUserSession = await this.sessionService.createSession(newUser);

    response.cookie('sid', newUserSession.id, {
      signed: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
    });

    return new AuthenticatedUserDto({
      ...newUser,
    });
  }

  @Post('/login')
  async loginUser(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const loggedInUser = await this.authService.login(body);
    const userSession = await this.sessionService.createSession(loggedInUser);

    response.cookie('sid', userSession.id, {
      signed: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
    });

    return new AuthenticatedUserDto({
      ...loggedInUser,
    });
  }

  @Get('/logout')
  async logoutUser(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('sid', {
      signed: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
    });
    return { message: 'loggedout' };
  }
}
