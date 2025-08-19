import {storeTenantType} from "@/core/types/tenantsTypes";
import {UpdateTenantRepository} from "@/features/feature_tenants/domain/repositories/update_tenant_repository";
import {UpdateTenantApi} from "@/features/feature_tenants/data/data_source/update_tenant_api";
import {TenantEntity} from "@/features/feature_tenants/domain/entities/tenant_entity";

export class UpdateTenantRepositoryImpl implements UpdateTenantRepository {
  constructor(private updateTenantApi: UpdateTenantApi) {
  }

  async updateTenant(tenantData: storeTenantType, tenantId: string): Promise<TenantEntity> {
    return await this.updateTenantApi.updateTenant(tenantData, tenantId);
  }
}