export interface AssetProfileEntity {
  id: {
    id: string;
    entityType: string
  };
  createdTime: number;
  tenantId: {
    id: string;
    entityType: string
  };
  name: string;
  description: string;
  image: string;
  defaultRuleChainId: {
    id: string;
    entityType: string
  };
  defaultDashboardId: {
    id: string;
    entityType: string
  };
  defaultQueueName: string;
  defaultEdgeRuleChainId: {
    id: string;
    entityType: string
  };
  version: number;
}
