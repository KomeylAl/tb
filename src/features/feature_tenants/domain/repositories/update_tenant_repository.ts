import {storeTenantType} from "@/core/types/tenantsTypes";
import {TenantEntity} from "@/features/feature_tenants/domain/entities/tenant_entity";

export interface UpdateTenantRepository {
  updateTenant(tenantData: storeTenantType, tenantId: string): Promise<TenantEntity>;
}