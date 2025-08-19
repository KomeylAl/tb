import {StoreTenantUserRepository} from "@/features/feature_tenants/domain/repositories/store_tenant_user_repository";
import {StoreTenantUserApi} from "@/features/feature_tenants/data/data_source/store_tenant_user_api";
import {storeTenantUserType} from "@/core/types/tenantsTypes";
import {TenantUserEntity} from "@/features/feature_tenants/domain/entities/tenant_user_entity";

export class StoreTenantUserRepositoryImpl implements StoreTenantUserRepository {
  constructor(private storeTenantUserApi: StoreTenantUserApi) {
  }

  async storeTenantUser(userData: storeTenantUserType, tenantId: string): Promise<TenantUserEntity> {
    return await this.storeTenantUserApi.storeTenant(userData, tenantId);
  }
}