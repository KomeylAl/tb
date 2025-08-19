import {Id, TenantEntity, TenantProfileId} from "@/features/feature_tenants/domain/entities/tenant_entity";

export class TenantModel implements TenantEntity {
  constructor(
      public additionalInfo: null,
      public address: string,
      public address2: string,
      public city: string,
      public country: string,
      public createdTime: number,
      public email: string,
      public id: Id,
      public name: string,
      public phone: string,
      public region: string,
      public state: string,
      public tenantProfileId: TenantProfileId,
      public title: string,
      public version: number,
      public zip: string
  ) {
  }

  static fromJson(json: TenantModel): TenantModel {
    return new TenantModel(
        json.additionalInfo,
        json.address,
        json.address2,
        json.city,
        json.country,
        json.createdTime,
        json.email,
        json.id,
        json.name,
        json.phone,
        json.region,
        json.state,
        json.tenantProfileId,
        json.title,
        json.version,
        json.zip
    );
  }
}