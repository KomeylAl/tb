"use client";

import React, {useMemo, useState} from "react";
import {debounce} from "next/dist/server/utils";
import {useModal} from "@/core/hooks/useModal";
import Header from "@/core/components/layout/Header";
import {BiPlus} from "react-icons/bi";
import {PuffLoader} from "react-spinners";
import Table from "@/core/components/common/Table";
import {tenantProfileColumns} from "@/core/columns";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import DeleteModal from "@/core/components/ui/DeleteModal";
import {TenantProfileEntity} from "@/features/feature_tenant_profiles/domain/entities/tenant_profile_entity";
import {useGetTenantProfiles} from "@/features/feature_tenant_profiles/presentation/hooks/useGetTenantProfiles";
import StoreTenantProfileForm from "@/features/feature_tenant_profiles/presentation/components/StoreTenantProfileForm";
import {Button} from "@/components/ui/button";

const TenantProfilesScreen = () => {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  const [profileId, setProfileId] = useState<string>("");
  const [profile, setProfile] = useState<TenantProfileEntity>();

  const {data, isLoading, error, refetch} = useGetTenantProfiles(
      page,
      pageSize,
      searchText
  );

  // const {mutate: deleteProfile, isPending: isDeleting} =
  //     useDeleteTenantProfile(() => {
  //       closeDelete();
  //       refetch().then(() => {
  //       });
  //     });

  const debouncedSearch = useMemo(() => {
    return debounce(() => {
      refetch().then(() => {
      });
    }, 300);
  }, [refetch]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    debouncedSearch();
  };

  const {isOpen, openModal, closeModal} = useModal();
  const {
    isOpen: deleteOpen,
    openModal: openDelete,
    closeModal: closeDelete,
  } = useModal();

  const {
    isOpen: editOpen,
    openModal: openEdit,
    closeModal: closeEdit,
  } = useModal();

  return (
      <div className="w-full h-screen">
        <Header isShowSearch searchFn={onSearchChange}/>

        <div className="w-full h-fullp-6 p-6 lg:p-12 space-y-6">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl lg:text-2xl font-bold">پروفایل سازمان ها</h1>
            <Button
                onClick={openModal}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
            >
              <BiPlus size={24}/> افزودن پروفایل جدید
            </Button>
          </div>

          {error && <p className="text-rose-600">خطا در دریافت اطلاعات </p>}

          {isLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <PuffLoader color="#3b82f6"/>
              </div>
          )}

          {data && (
              <Table
                  columns={tenantProfileColumns}
                  data={data.data}
                  pageSize={pageSize}
                  totalItems={data.totalElements}
                  currentPage={page + 1}
                  onPageChange={(newPage: number) => setPage(newPage - 1)}
                  showActions
                  onEdit={(item: TenantProfileEntity) => {
                    setProfile(item);
                    openEdit();
                  }}
                  onDelete={(item: TenantProfileEntity) => {
                    setProfileId(item.id.id);
                    openDelete();
                  }}
              />
          )}
        </div>

        <Dialog open={isOpen} onOpenChange={closeModal}>
          <DialogContent className="max-w-96 max-h-[90%] overflow-y-auto">
            <DialogTitle className="text-lg font-bold mb-2 mt-6">
              افزودن پروفایل
            </DialogTitle>
            <div className="mt-2">
              <StoreTenantProfileForm
                  onSuccess={() => {
                    closeModal();
                    refetch().then(() => {
                    });
                  }}
              />
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={editOpen} onOpenChange={closeEdit}>
          <DialogContent className="max-w-96 overflow-y-auto">
            <DialogTitle className="text-lg font-bold mb-2 mt-6">
              ویرایش پروفایل
            </DialogTitle>
            <div className="mt-2">

            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={deleteOpen} onOpenChange={closeDelete}>
          <DialogContent className="max-w-96 overflow-y-auto">
            <DialogTitle className="text-lg font-bold mb-2 mt-6">
              حذف پروفایل
            </DialogTitle>
            <div className="mt-2">
              {/*<DeleteModal*/}
              {/*    deleteFunc={() => deleteProfile(profileId)}*/}
              {/*    isDeleting={isDeleting}*/}
              {/*    onCancel={closeDelete}/>*/}
            </div>
          </DialogContent>
        </Dialog>
      </div>
  );
}

export default TenantProfilesScreen;