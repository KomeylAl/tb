export interface UserEntity {
  id: {
    entityType: string;
    id: string;
  };
  name: string;
  authority: string;
  email: string;
  phone: string;
  createdTime: number;
  firstName: string;
  lastName: string;
}