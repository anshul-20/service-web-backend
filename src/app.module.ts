import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import environmentConfiguration from './common/config/environmentConfiguration';
import { AuthenticateMiddleware } from './common/middlewares/authenticate.middleware';
import { ServiceModule } from './service/service.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [environmentConfiguration],
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ServiceModule,
    OrderModule,
  ],
  controllers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .forRoutes('user', 'service', 'order');
  }
}
