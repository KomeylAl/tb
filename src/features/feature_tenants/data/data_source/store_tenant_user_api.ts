import {storeTenantUserType} from "@/core/types/tenantsTypes";
import {TenantUserEntity} from "@/features/feature_tenants/domain/entities/tenant_user_entity";

export class StoreTenantUserApi {
  async storeTenant(userData: storeTenantUserType, tenantId: string): Promise<TenantUserEntity> {
    const res = await fetch(`/api/admin/tenants/${tenantId}/users`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (res.status !== 201) {
      const error = await res.json();
      throw new Error(error.message);
    }
    return await res.json();
  }
}