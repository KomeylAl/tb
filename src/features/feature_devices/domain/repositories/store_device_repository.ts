import {storeDeviceType} from "@/core/types";
import {DeviceEntity} from "@/features/feature_devices/domain/entities/device_entity";

export interface StoreDeviceRepository {
  storeDevice(deviceData: storeDeviceType): Promise<DeviceEntity>;
}