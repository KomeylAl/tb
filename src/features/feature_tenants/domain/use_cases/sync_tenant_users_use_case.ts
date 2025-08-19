import {SyncTenantUsersRepository} from "@/features/feature_tenants/domain/repositories/sync_tenant_users_repository";

export class SyncTenantUsersUseCase {
  constructor(private repository: SyncTenantUsersRepository) {
  }

  async execute(tenantId: string): Promise<void> {
    return await this.repository.syncTenantUsers(tenantId);
  }
}