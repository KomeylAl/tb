import {useState} from "react";
import {useGetTenantDevices} from "@/features/feature_tenants/presentation/hooks/useGetTenantDevices";
import {PuffLoader} from "react-spinners";
import Table from "@/core/components/common/Table";
import {tenantDeviceColumns} from "@/core/columns";

interface TenantDevicesProps {
  tenantId: string;
}

const TenantDevices = ({tenantId}: TenantDevicesProps) => {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);

  const {data, isLoading, error} = useGetTenantDevices(
      page,
      pageSize,
      tenantId
  );
  return (
      <div>
        {isLoading && (
            <div className="w-full h-full flex items-center justify-center">
              <PuffLoader color="#3b82f6"/>
            </div>
        )}
        {error && (
            <div className="w-full h-full flex items-center justify-center">
              <p style={{color: "red"}}>{error.message}</p>
            </div>
        )}

        {data && (
            <div className="w-full h-full flex-1 items-center">
              <div className="w-full h-full">
                <Table
                    columns={tenantDeviceColumns}
                    data={data.data}
                    pageSize={pageSize}
                    totalItems={data.totalElements}
                    currentPage={page + 1}
                    onPageChange={(newPage) => setPage(newPage - 1)}
                />
              </div>
            </div>
        )}
      </div>
  );
}

export default TenantDevices;