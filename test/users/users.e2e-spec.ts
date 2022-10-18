import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../../src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { typeOrmAsyncConfig } from '../../src/config/typeorm.config';

describe('Users - /users (e2e)', () => {
  const users = {
    name: 'name #1',
    email: 'email#1@gmail.com',
    password: 'password #1',
    phoneNumber: 'phoneNumber #1',
    address: 'address #1',
    isActive: true,
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig), UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create [POST /users]', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(users as CreateUserDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toMatchObject({
          id: expect.any(Number),
          name: users.name,
          email: users.email,
          phoneNumber: users.phoneNumber,
          address: users.address,
          isActive: users.isActive,
        });
      });
  });

  it('Get all users [GET /users]', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Get one user [GET /users/:id]', () => {
    return request(app.getHttpServer())
      .get('/users/2')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Delete one user [DELETE /users/:id]', () => {
    return request(app.getHttpServer()).delete('/users/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
