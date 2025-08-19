import {StoreTenantRepository} from "@/features/feature_tenants/domain/repositories/store_tenant_repository";
import {storeTenantType} from "@/core/types/tenantsTypes";
import {TenantEntity} from "@/features/feature_tenants/domain/entities/tenant_entity";

export class StoreTenantUseCase {
  constructor(private repository: StoreTenantRepository) {
  }

  async execute(tenantData: storeTenantType): Promise<TenantEntity> {
    return await this.repository.storeTenant(tenantData);
  }
}