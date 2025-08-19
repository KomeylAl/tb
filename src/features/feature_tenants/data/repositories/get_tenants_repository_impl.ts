import {GetTenantsRepository} from "@/features/feature_tenants/domain/repositories/get_tenants_repository";
import {GetTenantsApi} from "@/features/feature_tenants/data/data_source/get_tenants_api";
import {TenantsDataType} from "@/core/types";
import {TenantEntity} from "@/features/feature_tenants/domain/entities/tenant_entity";

export class GetTenantsRepositoryImpl implements GetTenantsRepository {
  constructor(private getTenantsApi: GetTenantsApi) {
  }

  async getTenant(tenantId: string): Promise<TenantEntity> {
    return await this.getTenantsApi.getTenant(tenantId);
  }

  async getTenants(page: number, pageSize: number, textSearch: string): Promise<TenantsDataType> {
    return await this.getTenantsApi.getTenants(page, pageSize, textSearch);
  }
}