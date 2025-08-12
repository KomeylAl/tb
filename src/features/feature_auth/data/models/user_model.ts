import {UserEntity} from "@/features/feature_auth/domain/entities/user_entity";

export class UserModel implements  UserEntity{
  constructor(
      public name:string,
      public email:string,
      public phone:string,
      public authority: string,
      public id: {
        id:string,
        entityType: string,
      },
      public firstName:string,
      public lastName:string,
      public createdTime:number,
  ) {}

  static fromJson(json: UserModel): UserModel{
    return new UserModel(json.name, json.email, json.phone, json.authority, json.id, json.firstName, json.lastName, json.createdTime);
  }
}