import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken'; 

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request               = context.switchToHttp().getRequest();
    const authorization: string = request.headers['authorization'];

    const jwt = authorization.replace('Bearer ', '');

    if (verify(jwt, process.env.JWT_SECRET)) {
      return true;
    }

    return false;
  }
}
