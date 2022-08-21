import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SessionService } from 'src/auth/session.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: {
        id: number;
        name: string;
        email: string;
        role: string;
        phoneNumber: string;
      };
    }
  }
}

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  constructor(private sessionService: SessionService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.signedCookies?.sid) {
      throw new UnauthorizedException('unauthorized');
    }

    const session = await this.sessionService.verifySession(
      parseInt(req.signedCookies.sid),
    );

    if (!session) {
      throw new UnauthorizedException('unauthorized');
    }

    req.currentUser = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role,
      phoneNumber: session.user.phoneNumber,
    };

    next();
  }
}
