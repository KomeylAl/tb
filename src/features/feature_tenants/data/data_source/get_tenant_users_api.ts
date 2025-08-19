import {TenantUsersDataType} from "@/core/types/tenantsTypes";

export class GetTenantUsersApi {
  async getTenantUsers(page: number = 0, pageSize: number = 1, tenantId: string = ""): Promise<TenantUsersDataType> {
    const res = await fetch(`/api/admin/tenants/${tenantId}/users?page=${page}&pageSize=${pageSize}`);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return await res.json();
  }
}