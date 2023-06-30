import { Reflector } from '@nestjs/core';
import {
  Injectable,
  HttpException,
  HttpStatus,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
@Injectable()
export class VerifyAuth implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const skipAuth = this.reflector.get<boolean>(
      'skipAuth',
      context.getHandler(),
    );
    // 如果需要跳过 token 验证，则直接返回 true
    if (skipAuth) return true;
    const req = context.switchToHttp().getRequest();
    const pathName = path.resolve(__dirname, '../keys/PUBLIC_KEY.pem');
    const PUBLIC_KEY = fs.readFileSync(pathName);
    const { authorization } = req.headers;
    try {
      const token = authorization.replace('Bearer ', '');
      const result = jwt.verify(token, PUBLIC_KEY);
      req.user = result;
      return true;
    } catch (err) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
