import {AuthApi} from "@/features/feature_auth/data/data_source/auth_api";
import {LoginRepository} from "@/features/feature_auth/domain/repositories/login_repository";
import {UserEntity} from "@/features/feature_auth/domain/entities/user_entity";

export class LoginRepositoryImpl implements LoginRepository {
  constructor(private loginApi: AuthApi) {}

  async login(email: string, password: string): Promise<UserEntity> {
    return await this.loginApi.sendLoginRequest(email, password);
  }
}