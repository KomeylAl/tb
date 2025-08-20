import {storeTenantProfileType} from "@/core/types/tenantsTypes";
import {TenantProfileEntity} from "@/features/feature_tenant_profiles/domain/entities/tenant_profile_entity";

export interface StoreTenantProfileRepository {
  storeTenantProfile(tenantProfileData: storeTenantProfileType): Promise<TenantProfileEntity>;
}