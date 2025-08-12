export class DevicesApi {
  async sendGetDevicesRequest(page: number, pageSize: number) {
    const res = await fetch(`/api/tenant/entity?entity=DEVICE&page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.message);
    }
    return await res.json();
  }
}