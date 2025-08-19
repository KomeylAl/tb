import {TenantsDataType} from "@/core/types";
import {TenantEntity} from "@/features/feature_tenants/domain/entities/tenant_entity";

export interface GetTenantsRepository {
  getTenant(tenantId: string): Promise<TenantEntity>;
  getTenants(page: number, pageSize: number, textSearch: string): Promise<TenantsDataType>;
}