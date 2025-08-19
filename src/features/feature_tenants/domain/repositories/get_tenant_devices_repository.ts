import {TenantDevicesDataType} from "@/core/types/tenantsTypes";

export interface GetTenantDevicesRepository {
  getTenantDevices(page: number, pageSize: number, tenantId: string): Promise<TenantDevicesDataType>;
}