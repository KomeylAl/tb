"use client";

import Header from "@/core/components/layout/Header";
import {useRouter} from "next/navigation";
import {useGetTenant} from "@/features/feature_tenants/presentation/hooks/useGetTenants";
import {PuffLoader} from "react-spinners";
import {Button} from "@/components/ui/button";
import {BiPencil} from "react-icons/bi";
import {MdDelete} from "react-icons/md";
import {useModal} from "@/core/hooks/useModal";
import {useDeleteTenant} from "@/features/feature_tenants/presentation/hooks/useDeleteTenant";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import DeleteModal from "@/core/components/ui/DeleteModal";
import {Tab, Tabs} from "@/core/components/common/Tabs";
import TenantDevices from "@/features/feature_tenants/presentation/components/TenantDevices";
import TenantUsers from "@/features/feature_tenants/presentation/components/TenantUsers";
import UpdateTenantForm from "@/features/feature_tenants/presentation/components/UpdateTenantForm";
import {useSyncTenantUsers} from "@/features/feature_tenants/presentation/hooks/useSyncTenantUsers";

interface SingleTenantScreenProps {
  tenantId: string;
}

const SingleTenantScreen = ({tenantId}: SingleTenantScreenProps) => {
  const router = useRouter();

  const { data, isLoading, error, refetch } = useGetTenant(tenantId);
  const { mutate: deleteTenant, isPending: isDeleting } = useDeleteTenant(() => router.back());
  const { mutate: syncUsers, isPending } = useSyncTenantUsers();

  const {
    isOpen: editOpen,
    openModal: openEdit,
    closeModal: closeEdit,
  } = useModal();
  const {
    isOpen: deleteOpen,
    openModal: openDelete,
    closeModal: closeDelete,
  } = useModal();
  return (
      <div className="w-full h-screen">
        <Header isShowSearch={false} searchFn={() => {}} />
        <div className='p-10'>
          {error && (
              <p className='w-full text-center text-rose-600'>خطا در دریافت اطلاعات سازمان!</p>
          )}

          {isLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <PuffLoader color="#3b82f6" />
              </div>
          )}

          {data && (
            <div className='w-full h-full flex flex-col items-start gap-16'>
              <div className='w-full flex items-center justify-between'>
                <h1 className="text-xl lg:text-3xl font-bold">
                  سازمان {data.name}
                </h1>
                <div className="flex items-center gap-4">
                  <Button
                      onClick={() => syncUsers(tenantId)}
                      disabled={isPending}
                      className="py-2 px-4 border border-blue-500 text-blue-500 rounded-lg flex items-center bg-white"
                  >
                    {isPending ? "در حال ارسال..." : "همگام سازی کاربران"}
                  </Button>
                  <Button
                      onClick={openEdit}
                      className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
                  >
                    <BiPencil size={24} />
                    ویرایش اطلاعات سازمان
                  </Button>
                  <Button
                      disabled={isDeleting}
                      onClick={openDelete}
                      className={`py-2 px-4 bg-rose-500 text-white rounded-lg flex items-center ${
                          isDeleting && "bg-rose-300"
                      }`}
                  >
                    <MdDelete size={24} />
                    {isDeleting ? "در حال حذف" : "حذف سازمان"}
                  </Button>
                </div>
              </div>
              <div className="w-full flex-1">
                <Tabs>
                  <Tab label="دستگاه ها" defaultTab>
                    <TenantDevices tenantId={tenantId}/>
                  </Tab>
                  <Tab label="کاربران">
                    <TenantUsers tenantId={tenantId} />
                  </Tab>
                </Tabs>
              </div>
            </div>
          )}
        </div>

        <Dialog open={deleteOpen} onOpenChange={closeDelete}>
          <DialogContent className="max-w-96 overflow-y-auto">
            <DialogTitle className="text-lg font-bold mb-2 mt-6">
              حذف سازمان
            </DialogTitle>
            <div className="mt-2">
              <DeleteModal
                  deleteFunc={() => deleteTenant(tenantId)}
                  isDeleting={isDeleting}
                  onCancel={closeDelete}/>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={editOpen} onOpenChange={closeEdit}>
          <DialogContent className="max-w-96 overflow-y-auto">
            <DialogTitle className="text-lg font-bold mb-2 mt-6">
              ویرایش سازمان
            </DialogTitle>
            <div className="mt-2">
              <UpdateTenantForm onSuccess={() => {
                closeEdit();
                refetch().then(() => {});
              }} tenantData={data} tenantId={tenantId} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
  );
}

export default SingleTenantScreen;