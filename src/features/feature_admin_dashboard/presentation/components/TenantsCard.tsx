import Image from "next/image";
import {BiPlus} from "react-icons/bi";
import {PuffLoader} from "react-spinners";
import {useTenantsCount} from "@/features/feature_admin_dashboard/presentation/hooks/useTenantsCount";
import {useModal} from "@/core/hooks/useModal";
import {Modal} from "@/core/components/layout/Modal";

const TenantsCard = () => {

  const {data, isLoading, error} = useTenantsCount();
  const {isOpen, openModal, closeModal} = useModal();

  return (
      <div
          className="w-full flex-1 bg-white dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-1 lg:top-6 left-5 w-20 h-20 bg-sky-500 rounded-full filter blur-2xl"/>

        {error && <p>خطا در دریافت اطلاعات سازمان ها</p>}

        {isLoading && (
            <div className="w-full h-full flex items-center justify-center">
              <PuffLoader color="#3b82f6" size={45}/>
            </div>
        )}

        {data && (
            <div>
              <p className="text-lg">تعداد سازمان ها</p>
              <div className="flex items-center gap-4 mt-3">
                <p className="text-lg">{data.totalElements}</p>
                <button onClick={openModal}>
                  <BiPlus size={25} className="text-blue-500"/>
                </button>
              </div>
            </div>
        )}
        <Image
            src="/images/device_vector.png"
            alt="devices"
            width={100}
            height={100}
            className="w-24 h-24 object-cover"
        />

        <Modal isOpen={isOpen} onCloseAction={closeModal} showCloseButton={false}>
          <div></div>
        </Modal>
      </div>
  );
}

export default TenantsCard;