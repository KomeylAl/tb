import {StoreAssetRepository} from "@/features/feature_assets/domain/repositories/store_asset_repository";
import {AssetEntity} from "@/features/feature_assets/domain/entities/asset_entity";
import {storeAssetType} from "@/core/types";

export class StoreAssetUseCase {
  constructor(private repository: StoreAssetRepository) {
  }

  async execute(assetData: storeAssetType): Promise<AssetEntity> {
    return await this.repository.storeAsset(assetData);
  }
}