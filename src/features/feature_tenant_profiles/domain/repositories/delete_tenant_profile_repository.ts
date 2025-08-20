export interface DeleteAssetProfileRepository {
  deleteAssetProfile(profileId: string): Promise<void>;
}