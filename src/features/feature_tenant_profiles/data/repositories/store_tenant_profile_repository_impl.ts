import {
    StoreTenantProfileRepository
} from "@/features/feature_tenant_profiles/domain/repositories/store_tenant_profile_repository";
import {StoreTenantProfileApi} from "@/features/feature_tenant_profiles/data/data_source/store_tenant_profile_api";
import {storeTenantProfileType} from "@/core/types/tenantsTypes";
import {TenantProfileEntity} from "@/features/feature_tenant_profiles/domain/entities/tenant_profile_entity";


export class StoreTenantProfileRepositoryImpl implements StoreTenantProfileRepository {
  constructor(private storeTenantProfileApi: StoreTenantProfileApi) {
  }

  async storeTenantProfile(assetProfileData: storeTenantProfileType): Promise<TenantProfileEntity> {
    return await this.storeTenantProfileApi.storeTenant(assetProfileData);
  }
}