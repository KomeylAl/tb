export interface DeviceEntity {
  id: {
    id: string;
    entityType: string;
  };
  createdTime: number;
  name: string;
  type: string;
  label: string;
  deviceProfileId: {
    id: string;
    entityType: string;
  };
  firmwareId: {
    id: string;
    entityType: string;
  };
  softwareId: {
    id: string;
    entityType: string;
  };
  version: number;
  additionalInfo: Record<string, string | number | undefined>;
  deviceData: {
    configuration: {
      type: string;
    };
    transportConfiguration: {
      type: string;
      powerMode: string;
      psmActivityTimer: number;
      edrxCycle: number;
      pagingTransmissionWindow: number ;
    }
  }
}