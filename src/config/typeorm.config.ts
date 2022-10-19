import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'mysql',
      host: configService.get<string>('DB_HOST', 'localhost'),
      port: configService.get<number>('DB_PORT', 3307),
      username: configService.get<string>('DB_USER_NAME', 'root'),
      password: configService.get<string>('DB_PASS', '123456'),
      database: configService.get<string>('DB_NAME', 'test'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      logging: true,
      synchronize: true,
    };
  },
  inject: [ConfigService],
};
