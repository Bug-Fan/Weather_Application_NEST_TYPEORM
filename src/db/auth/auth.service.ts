import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/request/user.dto';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { genSalt, hash } from 'bcrypt';
import { RegistrationResponseDto } from 'src/dto/response/registration.response.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('DataSource') private dataSource: DataSource) {}

  async registerUser(
    registerUserDto: UserDto,
  ): Promise<RegistrationResponseDto> {
    const { userEmail } = registerUserDto;
    let { userPassword } = registerUserDto;
    try {
      const salt = await genSalt();
      userPassword = await hash(userPassword, salt);

      const added = await this.dataSource.manager.insert(User, {
        userEmail,
        userPassword,
      });

      if (added) {
        return new RegistrationResponseDto(true, 'Registration successful');
      }
    } catch (error) {
      if (error.code == 23505) {
        return new RegistrationResponseDto(
          false,
          'You are already registered! Please login',
        );
      } else {
        console.log(error);
        throw new BadRequestException('Unable to register you');
      }
    }
  }
}
