import {
  DeleteAssetProfileRepository
} from "@/features/feature_asset_profiles/domain/repositories/delete_asset_profile_repository";

export class DeleteAssetProfileUseCase {
  constructor(private repository: DeleteAssetProfileRepository) {
  }

  async execute(profileId: string): Promise<void> {
    return await this.repository.deleteAssetProfile(profileId);
  }
}