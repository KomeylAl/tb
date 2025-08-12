import {GetDevicesRepository} from "@/features/feature_devices/domain/repositories/get_devices_repository";
import {DeviceApi} from "@/features/feature_devices/data/data_source/device_api";
import {DevicesDataType} from "@/core/types";

export class GetDevicesRepositoryImpl implements GetDevicesRepository {
  constructor(private getDevicesApi: DeviceApi) {}

  async getDevices(page: number, pageSize: number, textSearch: string): Promise<DevicesDataType> {
    return await this.getDevicesApi.getDevices(page, pageSize, textSearch);
  }
}