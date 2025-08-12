import {AssetProfileEntity} from "@/features/feature_asset_profiles/domain/entities/asset_profile_entity";

export class AssetProfileModel implements AssetProfileEntity {
  constructor(
      public createdTime: number,
      public defaultDashboardId: { id: string, entityType: string },
      public defaultEdgeRuleChainId: { id: string, entityType: string },
      public defaultQueueName: string,
      public defaultRuleChainId: { id: string, entityType: string },
      public description: string,
      public id: { id: string, entityType: string },
      public image: string,
      public name: string,
      public tenantId: { id: string, entityType: string },
      public version: number,
  ) {
  }

  static fromJson(json: AssetProfileModel): AssetProfileModel {
    return new AssetProfileModel(
        json.createdTime,
        json.defaultDashboardId,
        json.defaultEdgeRuleChainId,
        json.defaultQueueName,
        json.defaultRuleChainId,
        json.description,
        json.id,
        json.image,
        json.name,
        json.tenantId,
        json.version
    );
  }
}