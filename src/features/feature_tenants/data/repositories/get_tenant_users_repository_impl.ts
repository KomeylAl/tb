import {GetTenantUsersRepository} from "@/features/feature_tenants/domain/repositories/get_tenant_users_repository";
import {GetTenantUsersApi} from "@/features/feature_tenants/data/data_source/get_tenant_users_api";
import {TenantUsersDataType} from "@/core/types/tenantsTypes";

export class GetTenantUsersRepositoryImpl implements GetTenantUsersRepository {
  constructor(private getTenantUsersApi: GetTenantUsersApi) {
  }

  async getTenantUsers(page: number, pageSize: number, tenantId: string): Promise<TenantUsersDataType> {
    return await this.getTenantUsersApi.getTenantUsers(page, pageSize, tenantId);
  }
}