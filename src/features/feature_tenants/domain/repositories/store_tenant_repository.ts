import {storeTenantType} from "@/core/types/tenantsTypes";
import {TenantEntity} from "@/features/feature_tenants/domain/entities/tenant_entity";

export interface StoreTenantRepository {
  storeTenant(tenantData: storeTenantType): Promise<TenantEntity>;
}