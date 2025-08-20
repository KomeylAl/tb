import {TenantProfileEntity} from "@/features/feature_tenant_profiles/domain/entities/tenant_profile_entity";
import {storeTenantProfileType} from "@/core/types/tenantsTypes";

export class StoreTenantProfileApi {
  async storeTenant(tenantProfileData: storeTenantProfileType): Promise<TenantProfileEntity> {
    const res = await fetch('/api/admin/tenants/profiles', {
      method: 'POST',
      body: JSON.stringify(tenantProfileData),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.message ?? res.statusText);
    }
    return await res.json();
  }
}