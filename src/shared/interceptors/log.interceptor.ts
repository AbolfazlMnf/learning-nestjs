import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { AppService } from 'src/app.service';
import { LogType } from '../schemas/log.schema';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly appService: AppService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: string }>();
    // console.log(request);
    // console.log('Before');

    return next.handle().pipe(
      tap((response) => {
        if (request.method !== 'GET') {
          console.log('user', request.user);

          void this.appService.log({
            type: LogType[request.method as keyof typeof LogType],
            content: JSON.stringify(response),
            url: request.url,
            user: request.user ?? undefined,
          });
        }
      }),
    );
  }
}
