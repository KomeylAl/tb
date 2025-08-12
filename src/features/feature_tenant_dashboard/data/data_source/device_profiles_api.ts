export class DevicesApi {
  async sendGetDeviceProfilesRequest(page: number, pageSize: number) {
    const res = await fetch(`/api/tenant/profile?entity=DEVICE&page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.message);
    }
    return await res.json();
  }
}