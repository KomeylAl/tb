import {GetTenantUsersRepository} from "@/features/feature_tenants/domain/repositories/get_tenant_users_repository";
import {TenantUsersDataType} from "@/core/types/tenantsTypes";

export class GetTenantUsersUseCase {
  constructor(private repository: GetTenantUsersRepository) {
  }

  async execute(page: number, pageSize: number, tenantId: string): Promise<TenantUsersDataType> {
    return await this.repository.getTenantUsers(page, pageSize, tenantId);
  }
}