import {DeleteTenantApi} from "@/features/feature_tenants/data/data_source/delete_tenant_api";
import {DeleteTenantRepository} from "@/features/feature_tenants/domain/repositories/delete_tenant_repository";

export class DeleteTenantRepositoryImpl implements DeleteTenantRepository {
  constructor(private deleteTenantApi: DeleteTenantApi) {
  }

  async deleteTenant(tenantId: string): Promise<void> {
    await this.deleteTenantApi.deleteTenant(tenantId);
  }
}