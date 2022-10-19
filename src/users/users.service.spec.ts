import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';

const userArray = [
  {
    name: 'name #1',
    email: 'email#1@gmail.com',
    password: 'password #1',
    phoneNumber: 'phoneNumber #1',
    address: 'address #1',
  },
  {
    name: 'name #2',
    email: 'email#2@gmail.com',
    password: 'password #2',
    phoneNumber: 'phoneNumber #2',
    address: 'address #2',
  },
];

const oneUser = {
  name: 'name #1',
  email: 'email#1@gmail.com',
  password: 'password #1',
  phoneNumber: 'phoneNumber #1',
  address: 'address #1',
};

describe('UserService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOneBy: jest.fn().mockResolvedValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const oneUser = {
        name: 'name #1',
        email: 'email#1@gmail.com',
        password: 'password #1',
        phoneNumber: 'phoneNumber #1',
        address: 'address #1',
      };

      expect(
        service.create({
          name: 'name #1',
          email: 'email#1@gmail.com',
          password: 'password #1',
          phoneNumber: 'phoneNumber #1',
          address: 'address #1',
        }),
      ).resolves.toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(userArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findOne(1)).resolves.toEqual(oneUser);
      expect(repoSpy).toBeCalledWith({ id: 1 });
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.remove('2');
      expect(removeSpy).toBeCalledWith('2');
      expect(retVal).toBeUndefined();
    });
  });
});
