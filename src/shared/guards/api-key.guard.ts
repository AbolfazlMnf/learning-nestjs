import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('apikey : ', process.env.API_KEY);
    const request = context.switchToHttp().getRequest<Request>();
    const apikey = request.headers.apikey;
    console.log(apikey);
    if (apikey === process.env.API_KEY) {
      return true;
    } else {
      return false;
    }
  }
}
