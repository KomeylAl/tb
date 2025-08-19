import {TenantEntity} from "@/features/feature_tenants/domain/entities/tenant_entity";
import {storeTenantType} from "@/core/types/tenantsTypes";

export class StoreTenantApi {
  async storeTenant(tenantData: storeTenantType): Promise<TenantEntity> {
    const res = await fetch('/api/admin/tenants', {
      method: 'POST',
      body: JSON.stringify(tenantData),
    });
    if (res.status !== 201) {
      const error = await res.json();
      throw new Error(error.message);
    }
    return await res.json();
  }
}