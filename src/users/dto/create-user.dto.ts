export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
}

export class AdditionalUserInfo {
  isActive: boolean;
}
