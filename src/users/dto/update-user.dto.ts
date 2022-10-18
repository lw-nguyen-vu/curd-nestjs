import { IntersectionType } from '@nestjs/swagger';
import { CreateUserDto, AdditionalUserInfo } from './create-user.dto';

export class UpdateUserDto extends IntersectionType(
  CreateUserDto,
  AdditionalUserInfo,
) {}
