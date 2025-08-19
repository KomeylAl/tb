export interface SyncTenantUsersRepository {
  syncTenantUsers(tenantId: string): Promise<void>;
}