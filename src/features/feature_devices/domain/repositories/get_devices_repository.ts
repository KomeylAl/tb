import {DevicesDataType} from "@/core/types";

export interface GetDevicesRepository {
  getDevices(page: number, pageSize: number, textSearch: string): Promise<DevicesDataType>;
}