import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './users.entity';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findOneById(id: UUID): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  update(userId: UUID, userInformation: Partial<User>): Promise<UpdateResult> {
    return this.usersRepository.update(userId, userInformation);
  }

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getUserWithCertificatsAndImages(userId: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: userId as `${string}-${string}-${string}-${string}-${string}` },
      relations: ['certificats', 'images']
    });
  }

  deleteUser(userId: UUID): Promise<DeleteResult> {
    return this.usersRepository.delete(userId as `${string}-${string}-${string}-${string}-${string}`);
  }
}
