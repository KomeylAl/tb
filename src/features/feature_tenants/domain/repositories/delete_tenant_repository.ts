export interface DeleteTenantRepository {
  deleteTenant(tenantId: string): Promise<void>;
}