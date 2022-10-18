import { User } from 'src/users/user.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export class UserCreateSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().createMany(50);
  }
}
