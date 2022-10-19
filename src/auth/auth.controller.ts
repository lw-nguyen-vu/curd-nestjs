import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signup(@Request() req) {
    return await this.authService.register(req.body);
  }

  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.body);
  }
}
