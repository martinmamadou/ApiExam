import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Vérifiez que user existe et a le rôle admin
    if (!user) return false;

    console.log('User role ghggh:', user.isAdmin); // Ajoutez ce log pour debug
    return user.isAdmin === true;
  }
}