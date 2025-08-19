import {SyncTenantUsersRepository} from "@/features/feature_tenants/domain/repositories/sync_tenant_users_repository";
import {SyncTenantUsersApi} from "@/features/feature_tenants/data/data_source/sync_tenant_users_api";

export class SyncTenantUsersRepositoryImpl implements SyncTenantUsersRepository {
  constructor(private syncTenantUsersApi: SyncTenantUsersApi) {
  }

  async syncTenantUsers(tenantId: string): Promise<void> {
    return await this.syncTenantUsersApi.syncTenantUsers(tenantId);
  }
}