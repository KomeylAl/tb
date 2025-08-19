import {StoreDeviceRepository} from "@/features/feature_devices/domain/repositories/store_device_repository";
import {StoreDeviceApi} from "@/features/feature_devices/data/data_source/store_device_api";
import {storeDeviceType} from "@/core/types";
import {DeviceEntity} from "@/features/feature_devices/domain/entities/device_entity";

export class StoreDeviceRepositoryImpl implements StoreDeviceRepository {
  constructor(private storeDeviceApi: StoreDeviceApi) {
  }

  async storeDevice(deviceData: storeDeviceType): Promise<DeviceEntity> {
    return await this.storeDeviceApi.storeDevice(deviceData);
  }
}