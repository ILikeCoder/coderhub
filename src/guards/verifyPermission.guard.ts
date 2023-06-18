import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class VerifyPermissionGuard implements CanActivate {
  constructor(
    @InjectEntityManager()
    private readonly repository: Repository<any>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { id } = req.user;
    const keyName = Object.keys(req.params)[0];
    const resourceId = req.params[keyName];
    const resourceName = keyName.replace('Id', '');
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND userId = ?`;
    const result = await this.repository.query(statement, [resourceId, id]);
    return !!result.length;
  }
}
