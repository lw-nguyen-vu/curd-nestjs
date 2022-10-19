import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: any): Promise<number> {
    const user = await this.usersService.findByEmail(data.email);

    if (user) throw new ForbiddenException('Credentials taken');

    await this.usersService.create(data);

    return 1;
  }

  async login(data: any): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const isMatchPassword = await bcrypt.compare(data.password, user.password);

    if (!isMatchPassword) throw new ForbiddenException('Credentials incorrect');

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
