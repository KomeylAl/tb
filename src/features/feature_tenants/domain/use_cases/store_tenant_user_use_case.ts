import {StoreTenantUserRepository} from "@/features/feature_tenants/domain/repositories/store_tenant_user_repository";
import {TenantUserEntity} from "@/features/feature_tenants/domain/entities/tenant_user_entity";
import {storeTenantUserType} from "@/core/types/tenantsTypes";

export class StoreTenantUserUseCase {
  constructor(private repository: StoreTenantUserRepository) {
  }

  async execute(userData: storeTenantUserType, tenantId: string): Promise<TenantUserEntity> {
    return await this.repository.storeTenantUser(userData, tenantId);
  }
}