import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const createUserDto: CreateUserDto = {
  name: 'name #1',
  email: 'email#1@gmail.com',
  password: 'password #1',
  phoneNumber: 'phoneNumber #1',
  address: 'address #1',
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ id: '1', ...user }),
              ),
            findAll: jest.fn().mockResolvedValue([
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
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                id,
                name: 'name #1',
                email: 'email#1@gmail.com',
                password: 'password #1',
                phoneNumber: 'phoneNumber #1',
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      usersController.create(createUserDto);
      expect(usersController.create(createUserDto)).resolves.toEqual({
        id: '1',
        ...createUserDto,
      });
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      expect(usersController.findOne(1)).resolves.toEqual({
        id: 1,
        name: 'name #1',
        email: 'email#1@gmail.com',
        password: 'password #1',
        phoneNumber: 'phoneNumber #1',
      });
      expect(usersService.findOne).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should remove the user', () => {
      usersController.remove('2');
      expect(usersService.remove).toHaveBeenCalled();
    });
  });
});
