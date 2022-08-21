// import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
// import { Prisma } from '@prisma/client';
// import { Response } from 'express';

// @Catch()
// export class GlobalExceptionFilter implements ExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost): void {
//     const ctx = host.switchToHttp();
//     const response: Response = ctx.getResponse();

//     console.log(exception,'here');
//     response.status(500).json({ message: 'something went wrong' });
//   }
// }
// //
