import {
  randAddress,
  randEmail,
  randFullName,
  randPassword,
  randPhoneNumber,
} from '@ngneat/falso';
import { User } from 'src/users/user.entity';
import { define } from 'typeorm-seeding';

define(User, () => {
  const user = new User();

  user.name = randFullName();
  user.email = randEmail();
  user.password = randPassword();
  user.phoneNumber = randPhoneNumber();
  user.address = randAddress().street;

  return user;
});
