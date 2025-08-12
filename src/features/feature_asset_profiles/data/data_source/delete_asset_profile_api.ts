export class DeleteAssetProfileApi {
  async deleteAssetProfile(profileId: string): Promise<void> {
    const res = await fetch(`/api/tenant/assets/profiles/${profileId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return await res.json();
  }
}