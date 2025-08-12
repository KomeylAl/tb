export interface AssetEntity {
  id: {
    id: string;
    entityType: string;
  };
  createdTime: number;
  tenantId: {
    id: string;
    entityType: string;
  },
  customerId: {
    id: string;
    entityType: string;
  },
  name: string;
  type: string;
  label: string;
  assetProfileId: {
    id: string;
    entityType: string;
  };
  version: number;
  additionalInfo: Record<string, string | number | undefined>;
}