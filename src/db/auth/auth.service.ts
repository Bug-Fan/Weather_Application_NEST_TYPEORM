import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/request/user.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@Inject('DataSource') private dataSource: DataSource) {}

  registerUser(createUserDto: UserDto) {
    return createUserDto;
  }
}
