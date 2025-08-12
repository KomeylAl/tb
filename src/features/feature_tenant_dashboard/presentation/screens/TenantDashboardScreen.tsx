"use client";

import {useState} from "react";
import {BiPlus} from "react-icons/bi";
import {IoIosWarning} from "react-icons/io";
import {useModal} from "@/core/hooks/useModal";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import Header from "@/core/components/layout/Header";

export default function TenantDashboardScreen() {

  const [deviceId, setDeviceId] = useState("");

  const {isOpen, openModal, closeModal} = useModal();

  return (
      <div className="w-full min-h-screen flex flex-col overflow-y-auto">
        {/* هدر */}
        <Header isShowSearch={false} searchFn={() => {
        }}/>

        {/* بخش اصلی داشبورد */}
        <div className="w-full h-full flex-1 p-6 lg:p-12 space-y-6">
          {/* عنوان و دکمه‌ها */}
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl lg:text-2xl font-bold">داشبورد سازمان</h1>
            <div className="flex items-center gap-2">
              <div
                  className="py-2 px-6 rounded-md bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-300 shadow-md">
                افزودن دستگاه
              </div>
              <button
                  onClick={openModal}
                  className="bg-white dark:bg-gray-700 py-2 px-2 rounded-md text-blue-600 dark:text-blue-300 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md"
              >
                <BiPlus size={24}/>
              </button>
            </div>
          </div>

          {/* محتوای داشبورد */}
          <div className="w-full h-full flex-1 flex gap-6">
            <div className="w-full h-full flex flex-col space-y-6">
              <div className="w-full flex flex-col lg:flex-row gap-6">
                {/* اطلاعات دستگاه و دارایی */}
                <div className="flex flex-col w-full lg:w-[50%] gap-6">
                  {/* کارت تعداد دستگاه‌ها */}

                  {/* کارت تعداد دارایی‌ها */}


                  {/* نمودار یا اطلاعات اضافه */}
                  <div
                      className="w-full lg:w-[50%] min-h-[18rem] bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 flex flex-col gap-4">
                    {/* اینجا می‌توان نمودار یا محتوای دیگری اضافه کرد */}
                    <p className="text-lg">هشدار ها</p>
                    <div className="w-full flex-1 flex flex-col items-center gap-3">
                      <div
                          className="w-full flex-1 p-8 bg-amber-400/20 rounded-md flex items-center justify-between hover:shadow-md">
                        <p className="flex items-center gap-2 text-xl">
                          بحرانی <IoIosWarning/>
                        </p>
                        <p className="text-lg font-bold">0</p>
                      </div>
                      <div
                          className="w-full flex-1 p-8 bg-sky-400/20 rounded-md flex items-center justify-between hover:shadow-md">
                        <p className="flex items-center gap-2 text-xl">مجموع</p>
                        <p className="text-lg font-bold">0</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* بخش گسترده‌تر */}

              </div>

              {/* پنل کناری */}

            </div>
          </div>
          <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
              <DialogTitle className="text-lg font-bold mb-2 mt-6">
                افزودن دستگاه
              </DialogTitle>
              <div className="grid grid-cols-2 gap-2">
                {/*<AddDeviceForm />*/}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
  );
}