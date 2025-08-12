import {AssetEntity} from "@/features/feature_assets/domain/entities/asset_entity";

export class AssetModel implements AssetEntity {
  constructor(
      public additionalInfo: Record<string, string | number | undefined>,
      public assetProfileId: { id: string; entityType: string },
      public createdTime: number,
      public customerId: { id: string; entityType: string },
      public id: { id: string; entityType: string },
      public label: string,
      public name: string,
      public tenantId: { id: string; entityType: string },
      public type: string,
      public version: number,
  ) {
  };

  static fromJson(json: AssetModel): AssetModel {
    return new AssetModel(
        json.additionalInfo,
        json.assetProfileId,
        json.createdTime,
        json.customerId,
        json.id,
        json.label,
        json.name,
        json.tenantId,
        json.type,
        json.version
    );
  }

}