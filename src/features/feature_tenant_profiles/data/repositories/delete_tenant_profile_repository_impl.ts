import {
  DeleteAssetProfileRepository
} from "@/features/feature_asset_profiles/domain/repositories/delete_asset_profile_repository";
import {DeleteAssetProfileApi} from "@/features/feature_asset_profiles/data/data_source/delete_asset_profile_api";

export class DeleteAssetProfileRepositoryImpl implements DeleteAssetProfileRepository {
  constructor(private deleteAssetProfileApi: DeleteAssetProfileApi) {
  }

  async deleteAssetProfile(profileId: string): Promise<void> {
    await this.deleteAssetProfileApi.deleteAssetProfile(profileId);
  }
}