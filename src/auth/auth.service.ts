import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/request/user.dto';
import { DataSource } from 'typeorm';
import { User } from '../db/entities/user.entity';
import { genSalt, hash, compare } from 'bcrypt';
import { RegistrationResponseDto } from 'src/dto/response/registration.response.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from 'src/dto/response/login.response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject('DataSource') private dataSource: DataSource,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

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
        throw new BadGatewayException('Unable to register you');
      }
    }
  }

  async loginUser(loginUserDto: UserDto): Promise<LoginResponseDto> {
    const { userEmail, userPassword } = loginUserDto;

    try {
      const user = await this.dataSource.manager.findOneBy(User, { userEmail });
      if (user) {
        const userId = user.userId;
        if (await compare(userPassword, user.userPassword)) {
          const token: string = await this.jwtService.signAsync({
            userId,
            role: 'user',
          });
          return new LoginResponseDto(true, 'Login Successful', token);
        } else {
          return new LoginResponseDto(false, 'Your password is incorrect');
        }
      }
      if (!user) {
        return new LoginResponseDto(
          false,
          'You are not registered. Please Register',
        );
      }
    } catch (error) {
      console.log(error);
      throw new BadGatewayException('Unable to log you in');
    }
  }

  async loginAdmin(loginAdminDto: UserDto): Promise<LoginResponseDto> {
    const { userEmail, userPassword } = loginAdminDto;

    try {
      const user = userEmail === this.configService.get('ADMIN_EMAIL');
      if (user) {
        const userId = 'admin';
        if (userPassword === this.configService.get('ADMIN_PASSWORD')) {
          const token: string = await this.jwtService.signAsync({
            userId,
            role: 'admin',
          });
          return new LoginResponseDto(true, 'Login Successful', token);
        } else {
          return new LoginResponseDto(false, 'Your password is incorrect');
        }
      }
      if (!user) {
        return new LoginResponseDto(false, 'You are not admin. Bye');
      }
    } catch (error) {
      console.log(error);
      throw new BadGatewayException('Unable to log you in');
    }
  }
}
