import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  createSession(user: User) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    return this.prisma.session.create({
      data: {
        expiresOn: expiryDate,
        userId: user.id,
      },
    });
  }

  async verifySession(sessionId: number) {
    const currentSession = await this.prisma.session.findFirst({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!currentSession) {
      throw new UnauthorizedException('unauthorized');
    }

    return currentSession;
  }
}
