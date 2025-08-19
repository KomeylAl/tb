import {StoreDeviceRepository} from "@/features/feature_devices/domain/repositories/store_device_repository";
import {storeDeviceType} from "@/core/types";
import {DeviceEntity} from "@/features/feature_devices/domain/entities/device_entity";

export class StoreDeviceUseCase {
  constructor(private repository: StoreDeviceRepository) {
  }

  async execute(deviceData: storeDeviceType): Promise<DeviceEntity> {
    return await this.repository.storeDevice(deviceData);
  }
}