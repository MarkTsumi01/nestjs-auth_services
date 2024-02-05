import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { addUsers } from './dto/addUser.dto';
// import { findOne } from './dto/findOne.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async addUsers(user: addUsers): Promise<Users> {
    const existingUser = await this.userRepository.findOne({
      where: { username: Equal(user.username) },
    });

    if (existingUser) {
      throw new UnauthorizedException('Username is already taken');
    } else {
      return await this.userRepository.save(user);
    }
  }

  async findOne(username): Promise<Users> {
    return await this.userRepository.findOne({
      where: { username: Equal(username) },
    });
  }

  async listAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }
}
