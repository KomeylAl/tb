import {TenantDevicesDataType} from "@/core/types/tenantsTypes";

export class GetTenantDevicesApi {
  async getTenantDevices(page: number = 0, pageSize: number = 1, tenantId: string = ""): Promise<TenantDevicesDataType> {
    const res = await fetch(`/api/admin/tenants/${tenantId}/devices?page=${page}&pageSize=${pageSize}`);
    if (res.status !== 200) {
      const error = await res.json();
      throw new Error(error?.message ?? res.statusText);
    }
    return await res.json();
  }
}