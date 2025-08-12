import {LoginRepositoryImpl} from "@/features/feature_auth/data/repositories/login_repository_impl";
import {AuthApi} from "@/features/feature_auth/data/data_source/auth_api";
import {LoginUseCase} from "@/features/feature_auth/domain/use_cases/login_use_case";
import {useMutation} from "@tanstack/react-query";
import {useUser} from "@/core/context/UserContext";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

const useLogin = (email: string, password: string) => {
  const repo = new LoginRepositoryImpl(new AuthApi());
  const useCase = new LoginUseCase(repo);

  const router = useRouter();

  const { setUser } = useUser();

  return useMutation({
    mutationFn: () => useCase.execute(email, password),
    onSuccess: (result) => {
      setUser(result).then(() => {
        router.push("/");
        toast.success("با موفقیت وارد شدید. لطفا کمی صبر کنید.");
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
}

export default useLogin;