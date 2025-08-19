export class SyncTenantUsersApi {
  async syncTenantUsers(tenantId: string): Promise<void> {
    const res = await fetch(`/api/synchronization/tenants/${tenantId}/users`);
    if (res.status !== 200) {
      const error = await res.json();
      throw new Error(error?.message || res.statusText);
    }
    return await res.json();
  }
}