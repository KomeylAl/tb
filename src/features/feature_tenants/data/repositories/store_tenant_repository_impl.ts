import {StoreTenantRepository} from "@/features/feature_tenants/domain/repositories/store_tenant_repository";
import {StoreTenantApi} from "@/features/feature_tenants/data/data_source/store_tenant_api";
import {storeTenantType} from "@/core/types/tenantsTypes";
import {TenantEntity} from "@/features/feature_tenants/domain/entities/tenant_entity";

export class StoreTenantRepositoryImpl implements StoreTenantRepository {
  constructor(private storeTenantApi: StoreTenantApi) {
  }

  async storeTenant(tenantData: storeTenantType): Promise<TenantEntity> {
    return await this.storeTenantApi.storeTenant(tenantData);
  }
}