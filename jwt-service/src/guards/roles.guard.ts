import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExpressRequestInterface } from "../types/expressRequest.interface";
import { InsufficientAccessRightsException, UnAuthorizedException} from "../app.exceptions";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    private matchRoles (allowedRoles: string[], currentUserRoles: string[]): boolean {
        const intersection = allowedRoles.filter(element => currentUserRoles.includes(element));
        return !!intersection.length
    }

    canActivate(context: ExecutionContext): boolean {
        const rolesForAccess = this.reflector.getAllAndMerge<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!rolesForAccess) return true;

        const request = context
            .switchToHttp()
            .getRequest<ExpressRequestInterface>();

        if (!request.currentUser) throw new UnAuthorizedException()

        const currentUser = request.currentUser;

        const isAccessAllowed = this.matchRoles(rolesForAccess, currentUser.roles);

        if (!isAccessAllowed) throw new InsufficientAccessRightsException()

        return true
    }
}