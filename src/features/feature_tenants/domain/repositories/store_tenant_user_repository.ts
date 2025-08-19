import {storeTenantUserType} from "@/core/types/tenantsTypes";
import {TenantUserEntity} from "@/features/feature_tenants/domain/entities/tenant_user_entity";

export interface StoreTenantUserRepository {
  storeTenantUser(userData: storeTenantUserType, tenantId: string): Promise<TenantUserEntity>;
}