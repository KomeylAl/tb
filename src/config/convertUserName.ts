import {UserEntity} from "@/features/feature_auth/domain/entities/user_entity";

export const convertUserName = (user: UserEntity | null): string => {
  let name: string = "";
  if (!user) {
    name = "name";
  } else {
    if (user.firstName && !user.lastName) name = user.firstName;
    if (user.lastName && !user.firstName) name = user.lastName;
    if (!user.firstName && !user.lastName) name = user.name;
    if (user.firstName && user.lastName)
      name = `${user.firstName} ${user.lastName}`;
  }
  return name;
};