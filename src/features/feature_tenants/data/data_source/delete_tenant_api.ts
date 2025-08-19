export class DeleteTenantApi {
  async deleteTenant(tenantIs: string): Promise<void> {
    const res = await fetch(`/api/admin/tenants/${tenantIs}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return await res.json();
  }
}