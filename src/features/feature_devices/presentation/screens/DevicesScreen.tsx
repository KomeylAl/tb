"use client";

import React, {useMemo, useState} from "react";
import {useGetDevices} from "@/features/feature_devices/presentation/hooks/useGetDevices";
import {debounce} from "next/dist/server/utils";
import Header from "@/core/components/layout/Header";
import {BiPlus} from "react-icons/bi";
import {PuffLoader} from "react-spinners";
import {devicesColumns} from "@/core/columns";
import Table from "@/core/components/common/Table";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import StoreDeviceForm from "@/features/feature_devices/presentation/components/StoreDeviceForm";
import {useModal} from "@/core/hooks/useModal";

const DevicesScreen = () => {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  const {data, isLoading, error, refetch} = useGetDevices(
      page,
      pageSize,
      searchText
  );

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
  return (
      <div className="w-full h-screen">
        <Header isShowSearch searchFn={onSearchChange}/>

        <div className="w-full h-fullp-6 p-6 lg:p-12 space-y-6">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl lg:text-2xl font-bold">دستگاه ها</h1>
            <button
                onClick={openModal}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
            >
              <BiPlus size={24}/> افزودن دستگاه جدید
            </button>
          </div>

          {error && <p>خطا در دریافت اطلاعات </p>}

          {isLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <PuffLoader color="#3b82f6"/>
              </div>
          )}

          {data && (
              <Table
                  columns={devicesColumns}
                  data={data.data}
                  pageSize={pageSize}
                  totalItems={data.totalElements}
                  currentPage={page + 1}
                  onPageChange={(newPage: number) => setPage(newPage - 1)}
              />
          )}
        </div>

        <Dialog open={isOpen} onOpenChange={closeModal}>
          <DialogContent className="max-w-96 overflow-y-auto">
            <DialogTitle className="text-lg font-bold mb-2 mt-6">
              افزودن دستگاه
            </DialogTitle>
            <div className="mt-2">
              <StoreDeviceForm onSuccess={() => {
                closeModal();
                refetch().then(() => {
                });
              }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
  );
}

export default DevicesScreen;