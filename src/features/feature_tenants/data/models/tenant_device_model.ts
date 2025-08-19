import {TenantDeviceEntity} from "@/features/feature_tenants/domain/entities/tenant_device_entity";

export class TenantDeviceModel implements TenantDeviceEntity {
  constructor(
      public createdAt: string,
      public id: number,
      public name: string,
      public tenantId: number,
      public things_id: string,
      public type: string,
      public updatedAt: string,
  ) {
  }

  static fromJson(json: TenantDeviceModel): TenantDeviceModel {
    return new TenantDeviceModel(
        json.createdAt,
        json.id,
        json.name,
        json.tenantId,
        json.things_id,
        json.type,
        json.updatedAt
    )
  }
}