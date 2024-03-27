import { CanActivate, ExecutionContext,Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "../decorator/role.decorator";
@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get(Roles,context.getHandler())
        console.log("权限",roles)
        const request = context.switchToHttp().getRequest();
        //request 如何 获取用户的 角色 ，然后跟 role守卫进行匹配
        console.log("request ",request)
        return true
    }

}