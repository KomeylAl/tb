import {UpdateTenantRepository} from "@/features/feature_tenants/domain/repositories/update_tenant_repository";
import {storeTenantType} from "@/core/types/tenantsTypes";
import {TenantEntity} from "@/features/feature_tenants/domain/entities/tenant_entity";

export class UpdateTenantUseCase {
  constructor(private repository: UpdateTenantRepository) {
  }

  async execute(tenantData: storeTenantType, tenantId: string): Promise<TenantEntity> {
    return await this.repository.updateTenant(tenantData, tenantId);
  }
}