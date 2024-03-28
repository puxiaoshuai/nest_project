import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorators/role.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest();
    //request 如何 获取用户的 角色 ，然后跟 role守卫进行匹配
    //在使用 jwt守卫后会返回user,此时request会携带user信息,注意  需要把   @UseGuards(AuthGuard('jwt'),RolesGuard) 合并写已便获取 上下文信息，
    //分开写会导致 reqeust.user为 undefined
    if (roles.includes(request.user.role)) {
      return true;
    } else {
      return false;
    }
  }
}
