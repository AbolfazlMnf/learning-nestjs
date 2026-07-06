import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: any }>();
    const token = request?.headers?.authorization?.split(` `)[1];
    if (!token) {
      return false;
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request[`user`] = {
        _id: payload._id,
        role: payload.role,
      };
      return true;
    } catch (err) {
      return false;
    }
  }
}
