import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Role } from 'src/user/schemas/user.shema';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly role: Role[]) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: any }>();

    if (this.role.includes(request.user?.role)) {
      return true;
    } else {
      return false;
    }
  }
}
