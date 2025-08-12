import {DevicesDataType} from "@/core/types";

export class DeviceApi {
  async getDevices(page: number = 0, pageSize: number = 1, textSearch: string = ""): Promise<DevicesDataType> {
    const res = await fetch(`/api/tenant/devices?page=${page}&pageSize=${pageSize}&textSearch=${textSearch}`);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return await res.json();
  }
}