export class AuthApi {
  async sendGetTenantsRequest(page: number, pageSize: number) {
    const res = await fetch(`/api/admin/entity?entity=TENANT&page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.message);
    }
    return await res.json();
  }
}