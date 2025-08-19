import {TenantEntity} from "@/features/feature_tenants/domain/entities/tenant_entity";
import {storeTenantType} from "@/core/types/tenantsTypes";

export class UpdateTenantApi {
  async updateTenant(tenantData: storeTenantType, tenantId: string): Promise<TenantEntity> {
    const res = await fetch(`/api/admin/tenants/${tenantId}/update`, {
      method: 'POST',
      body: JSON.stringify(tenantData),
    });
    if (res.status !== 200) {
      const error = await res.json();
      throw new Error(error?.message ?? res.statusText);
    }
    return await res.json();
  }
}