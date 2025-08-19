import {storeDeviceType} from "@/core/types";
import {DeviceEntity} from "@/features/feature_devices/domain/entities/device_entity";

export class StoreDeviceApi {
  async storeDevice(deviceData: storeDeviceType): Promise<DeviceEntity> {
    const res = await fetch('/api/tenant/devices', {
      method: 'POST',
      body: JSON.stringify(deviceData),
    });
    if (res.status !== 201) {
      const error = await res.json();
      throw new Error(error.message);
    }
    return await res.json();
  }
}