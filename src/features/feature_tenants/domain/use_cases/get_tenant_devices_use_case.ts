import {GetTenantDevicesRepository} from "@/features/feature_tenants/domain/repositories/get_tenant_devices_repository";
import {TenantDevicesDataType} from "@/core/types/tenantsTypes";

export class GetTenantDevicesUseCase {
  constructor(private repository: GetTenantDevicesRepository) {
  }

  async execute(page: number, pageSize: number, tenantId: string): Promise<TenantDevicesDataType> {
    return await this.repository.getTenantDevices(page, pageSize, tenantId);
  }
}