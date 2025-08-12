import {DeviceEntity} from "@/features/feature_devices/domain/entities/device_entity";

export class DeviceModel implements DeviceEntity {
  constructor(
      public id: {
        id: string,
        entityType: string,
      },
      public createdTime: number,
      public name: string,
      public type: string,
      public label: string,
      public deviceProfileId: {
        id: string;
        entityType: string;
      },
      public firmwareId: {
        id: string;
        entityType: string;
      },
      public softwareId: {
        id: string;
        entityType: string;
      },
      public version: number,
      public additionalInfo: Record<string, string | number | undefined>,
      public deviceData: {
        configuration: {
          type: string;
        };
        transportConfiguration: {
          type: string;
          powerMode: string;
          psmActivityTimer: number;
          edrxCycle: number;
          pagingTransmissionWindow: number;
        }
      }
  ) {
  }

  static fromJson(json: DeviceModel): DeviceModel {
    return new DeviceModel(json.id, json.createdTime, json.name, json.type, json.label, json.deviceProfileId, json.firmwareId, json.softwareId, json.version, json.additionalInfo, json.deviceData);
  }
}