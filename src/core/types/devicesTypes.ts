export type storeDeviceType = {
  name: string;
  label?: string;
  type?: string;
  deviceProfileId: {
    id?: string;
    entityType: string;
  };
  additionalInfo: {
    description?: string;
    location?: string;
  };
};