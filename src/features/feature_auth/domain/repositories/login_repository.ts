import {UserEntity} from "@/features/feature_auth/domain/entities/user_entity";

export interface LoginRepository {
  login(email: string, password: string): Promise<UserEntity>;
}