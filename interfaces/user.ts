import { Permission, TypeAccount } from '@prisma/client';
import { Expose } from 'class-transformer';

export class User {
  @Expose()
  uuid: string;
  @Expose()
  type: TypeAccount;
  @Expose()
  domain: string;
  @Expose()
  tenantId: string;
  @Expose()
  permissions: Permission[];
}
