import {useState} from "react";
import {useGetTenantUsers} from "@/features/feature_tenants/presentation/hooks/useGetTenantUsers";
import {useModal} from "@/core/hooks/useModal";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {PuffLoader} from "react-spinners";
import {Button} from "@/components/ui/button";
import Table from "@/core/components/common/Table";
import {tenantUsersColumns} from "@/core/columns";
import StoreTenantUserForm from "@/features/feature_tenants/presentation/components/StoreTenantUserForm";

interface TenantUsersProps {
  tenantId: string;
}

const TenantUsers = ({tenantId}: TenantUsersProps) => {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);

  const {data, isLoading, error, refetch} = useGetTenantUsers(
      page,
      pageSize,
      tenantId
  );

  const {isOpen, openModal, closeModal} = useModal();

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
                <div className="w-full">
                  <Button
                      onClick={openModal}
                      className="px-4 py-2 bg-blue-500 rounded-lg text-white mb-3"
                  >
                    افزودن کاربر
                  </Button>
                </div>
                <Table
                    columns={tenantUsersColumns}
                    data={data.data}
                    pageSize={pageSize}
                    totalItems={data.totalElements}
                    currentPage={page + 1}
                    onPageChange={(newPage) => setPage(newPage - 1)}
                />
              </div>
            </div>
        )}

        <Dialog open={isOpen} onOpenChange={closeModal}>
          <DialogContent className="overflow-y-auto max-h-[80%] max-w-[400px] rounded-md">
            <DialogTitle className="text-lg font-bold mb-2 mt-6">
              افزودن کاربر
            </DialogTitle>
            <StoreTenantUserForm onSuccess={() => {
              closeModal();
              refetch().then(() => {
              });
            }} tenantId={tenantId}/>
          </DialogContent>
        </Dialog>
      </div>
  );
}

export default TenantUsers;