import {useState} from "react";
import {useRouter} from "next/navigation";
import useLogin from "@/features/feature_auth/presentation/hooks/useLogin";
import toast from "react-hot-toast";
import Link from "next/link";
import {ClipLoader} from "react-spinners";
import Image from "next/image";

import back from "../../../../../public/images/login_light_bg.jpg";

const LoginScreen = () => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const { mutate: login, isPending } = useLogin(formData.username, formData.password);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("لطفا همه فیلد هارا پر کنید.")
    }

    login();
    router.replace("/dashboard");
  }

  return (
      <div className="w-full h-screen flex p-8 md:p-16 relative">
        <Image src={back} alt="" className="w-full h-full object-cover absolute top-0 right-0 -z-10" />
        <div className="w-[50%] h-full hidden lg:block"></div>
        <div className="w-full lg:w-[50%] h-full flex flex-col items-start justify-center md:px-10 gap-16">
          <div className="w-full">
            <h2 className="text-2xl md:text-[40px] font-bold">
              داشبورد خدمات هوشمند اینترنت اشیاء
            </h2>
            {/* <p className="mt-4">
            قدرت گرفته با <span className="text-sky-600">Thingsboard</span>
          </p> */}
          </div>
          <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              <input
                  type="email"
                  required
                  value={formData.username}
                  onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                  }
                  placeholder="نام کاربری (ایمیل)"
                  className="w-full md:w-96 py-4 px-4 rounded-md border border-gray-300"
              />
              <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                  }
                  placeholder="رمز عبور"
                  className="w-full md:w-96 py-4 px-4 rounded-md border border-gray-300 mt-3"
              />
              <button
                  type="submit"
                  className={`flex items-center justify-center text-white text-xl hover:bg-sky-700 transition-all duration-300 bg-sky-500 py-2 px-4 rounded-md mt-8 ${isPending ? "w-fit" : "w-48"}`}
              >
                {isPending ? <ClipLoader color="#ffffff" size={30}/> : "ورود"}
              </button>
            </form>
          </div>
          <div className="w-full flex flex-col">
            <Link
                href="/"
                className="hover:text-sky-700 transition-all duration-300"
            >
              رمز عبور خود را فراموش کرده اید؟
            </Link>
            <Link href="/" className="text-sky-600 mt-4">
              ارتباط با پشتیبانی
            </Link>
          </div>
        </div>
      </div>
  )
}

export default LoginScreen;