import {TenantsDataType} from "@/core/types";
import {TenantEntity} from "@/features/feature_tenants/domain/entities/tenant_entity";

export class GetTenantsApi {
  async getTenant(tenantId: string): Promise<TenantEntity> {
    const res = await fetch(`/api/admin/tenants/${tenantId}`);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return await res.json();
  }

  async getTenants(page: number = 0, pageSize: number = 1, textSearch: string = ""): Promise<TenantsDataType> {
    const res = await fetch(`/api/admin/tenants?page=${page}&pageSize=${pageSize}&textSearch=${textSearch}`);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return await res.json();
  }
}