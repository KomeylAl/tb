import {GetTenantDevicesRepository} from "@/features/feature_tenants/domain/repositories/get_tenant_devices_repository";
import {GetTenantDevicesApi} from "@/features/feature_tenants/data/data_source/get_tenant_devices_api";
import {TenantDevicesDataType} from "@/core/types/tenantsTypes";

export class GetTenantDevicesRepositoryImpl implements GetTenantDevicesRepository {
  constructor(private getTenantDevicesApi: GetTenantDevicesApi) {
  }

  async getTenantDevices(page: number, pageSize: number, tenantId: string): Promise<TenantDevicesDataType> {
    return await this.getTenantDevicesApi.getTenantDevices(page, pageSize, tenantId);
  }
}