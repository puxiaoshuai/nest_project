import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

// 没权限如何 定义code,这样让客户端知道是token失效， 让重新登录
//直接就废弃了
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log('user权限',req);
    //这里面验证 token
    return true;
  }
}

// 守卫，  1 token验证的守卫， 2.角色权限的守卫，
