import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WorkerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return request.currentUser.role === 'WORKER';
  }
}

export function IsWorker() {
  return UseGuards(WorkerGuard);
}
