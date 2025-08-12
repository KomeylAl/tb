"use client";

import TenantsCard from "@/features/feature_admin_dashboard/presentation/components/TenantsCard";
import ProfilesCard from "@/features/feature_admin_dashboard/presentation/components/ProfilesCard";
import Header from "@/core/components/layout/Header";

const AdminDashboardScreen = () => {
  return (
      <div className="w-full min-h-screen flex flex-col">
        {/* هدر */}
        <Header isShowSearch={false} searchFn={() => {
        }}/>

        {/* محتوای اصلی */}
        <div className="p-6 lg:p-12 space-y-6">
          <h1 className="text-xl lg:text-2xl font-bold">داشبورد مدیریت</h1>
          <div className="flex-1 flex flex-col lg:flex-row gap-6 mt-6 overflow-hidden">
            {/* بخش اصلی چپ */}
            <div className="w-full lg:w-[65%] flex flex-col gap-5">
              {/* بخش بالا */}
              <div className="flex-1 flex flex-col lg:flex-row gap-5 overflow-hidden">
                <div className="flex flex-col w-full lg:w-[50%] gap-5">

                  <TenantsCard/>

                  <ProfilesCard/>
                </div>
                {/*<EntitiesSection />*/}
              </div>

              {/*<SystemInfo />*/}
            </div>

            {/* سایدبار */}
            <div className="w-full lg:w-[35%] p-8 overflow-auto">
              {/*<LastRequests />*/}
            </div>
          </div>
        </div>
      </div>
  );
}

export default AdminDashboardScreen;