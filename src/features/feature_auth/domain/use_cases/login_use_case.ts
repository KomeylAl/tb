import {LoginRepository} from "@/features/feature_auth/domain/repositories/login_repository";
import {UserEntity} from "@/features/feature_auth/domain/entities/user_entity";

export class LoginUseCase {
  constructor(private repository: LoginRepository) {}

  async execute(email: string, password: string): Promise<UserEntity> {
    return this.repository.login(email, password);
  }
}