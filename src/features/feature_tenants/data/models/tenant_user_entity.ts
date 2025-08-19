import {TenantUserEntity} from "@/features/feature_tenants/domain/entities/tenant_user_entity";

export class TenantUserModel implements TenantUserEntity {
  constructor(
      public additionalInfo: null,
      public authority: string,
      public createdTime: number,
      public customerId: { id: string, entityType: string },
      public email: string,
      public firstName: string,
      public id: { id: string, entityType: string },
      public lastName: string,
      public name: string,
      public phone: string,
      public tenantId: { id: string, entityType: string },
      public version: number,
  ) {
  }

  static fromJson(json: TenantUserModel): TenantUserEntity {
    return new TenantUserModel(
        json.additionalInfo,
        json.authority,
        json.createdTime,
        json.customerId,
        json.email,
        json.firstName,
        json.id,
        json.lastName,
        json.name,
        json.phone,
        json.tenantId,
        json.version
    );
  }
}