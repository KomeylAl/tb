import {DeleteTenantRepository} from "@/features/feature_tenants/domain/repositories/delete_tenant_repository";

export class DeleteTenantUseCase {
  constructor(private repository: DeleteTenantRepository) {
  }

  async execute(tenantId: string): Promise<void> {
    return await this.repository.deleteTenant(tenantId);
  }
}