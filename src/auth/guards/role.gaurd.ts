import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGaurd implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextes = [context.getClass(), context.getHandler()];
    const user = context.switchToHttp().getRequest().user;
    const roles = this.reflector.getAllAndMerge('role', contextes);
    return roles.some((role) => role == user.role);
  }
}
