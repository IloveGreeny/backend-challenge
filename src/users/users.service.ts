import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user || null;
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.age = createUserDto.age;
    return await this.userRepository.save(user);
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update({ id }, updateUserDto);
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
  async searchUsers(searchUserDto: SearchUserDto): Promise<Partial<User>[]> {
    const { firstName, lastName, age } = searchUserDto;
    const queryBuilder = this.userRepository.createQueryBuilder('user')
      .select(['user.firstName', 'user.lastName', 'user.age']);

    if (firstName) {
      queryBuilder.andWhere('user.firstName ILIKE :firstName', { firstName: `%${firstName}%` });
    }
    if (lastName) {
      queryBuilder.andWhere('user.lastName ILIKE :lastName', { lastName: `%${lastName}%` });
    }
    if (age !== undefined) {
      queryBuilder.andWhere('user.age = :age', { age });
    }

    return await queryBuilder.getMany();
  }
}