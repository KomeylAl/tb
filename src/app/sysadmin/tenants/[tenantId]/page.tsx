import React from "react";
import SingleTenantScreen from "@/features/feature_tenants/presentation/screens/SingleTenantScreen";

interface Params {
  tenantId: string;
}

interface PageProps {
  params: React.Usable<Params>;
}

const Tenant = ({ params }: PageProps) => {
  const { tenantId } = React.use<Params>(params);
  return (
      <SingleTenantScreen tenantId={tenantId} />
  );
}

export default Tenant;