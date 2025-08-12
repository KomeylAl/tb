import {GetDevicesRepository} from "@/features/feature_devices/domain/repositories/get_devices_repository";
import {DevicesDataType} from "@/core/types";

export class GetDevicesUseCase {
  constructor(private repository: GetDevicesRepository) {}

  async execute(page: number, pageSize: number, textSearch: string): Promise<DevicesDataType> {
    return await this.repository.getDevices(page, pageSize, textSearch);
  }
}