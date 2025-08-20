import {
    StoreTenantProfileRepository
} from "@/features/feature_tenant_profiles/domain/repositories/store_tenant_profile_repository";
import {storeTenantProfileType} from "@/core/types/tenantsTypes";
import {TenantProfileEntity} from "@/features/feature_tenant_profiles/domain/entities/tenant_profile_entity";


export class StoreTenantProfileUseCase {
  constructor(private repository: StoreTenantProfileRepository) {
  }

  async execute(assetProfileData: storeTenantProfileType): Promise<TenantProfileEntity> {
    return await this.repository.storeTenantProfile(assetProfileData);
  }
}