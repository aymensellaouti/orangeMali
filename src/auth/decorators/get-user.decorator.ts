import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import any = jasmine.any;
import { User } from "../../user/entities/user.entity";

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
