import {
    GetTenantProfilesRepository
} from "@/features/feature_tenant_profiles/domain/repositories/get_tenant_profiles_repository";
import {TenantProfilesDataType} from "@/core/types";

export class GetTenantProfilesUseCase {
  constructor(private repository: GetTenantProfilesRepository) {}

  async execute(page: number, pageSize: number, textSearch: string): Promise<TenantProfilesDataType> {
    return await this.repository.getTenantProfiles(page, pageSize, textSearch);
  }
}