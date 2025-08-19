import {GetTenantsRepository} from "@/features/feature_tenants/domain/repositories/get_tenants_repository";
import {TenantsDataType} from "@/core/types";
import {TenantEntity} from "@/features/feature_tenants/domain/entities/tenant_entity";

export class GetTenantUseCase {
  constructor(private repository: GetTenantsRepository) {}

  async execute(tenantId: string): Promise<TenantEntity> {
    return await this.repository.getTenant(tenantId);
  }
}

export class GetTenantsUseCase {
  constructor(private repository: GetTenantsRepository) {}

  async execute(page: number, pageSize: number, textSearch: string): Promise<TenantsDataType> {
    return await this.repository.getTenants(page, pageSize, textSearch);
  }
}