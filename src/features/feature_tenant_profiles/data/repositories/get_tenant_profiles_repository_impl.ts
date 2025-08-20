import {
    GetTenantProfilesRepository
} from "@/features/feature_tenant_profiles/domain/repositories/get_tenant_profiles_repository";
import {GetTenantProfilesApi} from "@/features/feature_tenant_profiles/data/data_source/get_tenant_profiles_api";
import {TenantProfilesDataType} from "@/core/types";

export class GetTenantProfilesRepositoryImpl implements GetTenantProfilesRepository {
  constructor(private getTenantProfilesApi: GetTenantProfilesApi) {
  }

  async getTenantProfiles(page: number, pageSize: number, textSearch: string): Promise<TenantProfilesDataType> {
    return await this.getTenantProfilesApi.getTenantProfiles(page, pageSize, textSearch);
  }
}