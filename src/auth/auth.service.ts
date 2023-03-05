import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from 'src/dto/request/user.dto';
import { DataSource } from 'typeorm';
import { genSalt, hash, compare } from 'bcrypt';
import { RegistrationResponseDto } from 'src/dto/response/registration.response.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from 'src/dto/response/login.response.dto';
import { ConfigService } from '@nestjs/config';
import { AuthDbService } from 'src/db/auth.db.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('DataSource') private dataSource: DataSource,
    private jwtService: JwtService,
    private configService: ConfigService,
    private authDbService: AuthDbService,
  ) {}

  async registerUser(
    registerUserDto: UserDto,
  ): Promise<RegistrationResponseDto> {
    const { userEmail } = registerUserDto;
    let { userPassword } = registerUserDto;
    try {
      const salt = await genSalt();
      userPassword = await hash(userPassword, salt);

      const added = await this.authDbService.registerUser(
        new UserDto(userEmail, userPassword),
      );
      console.log(typeof added);
      if (added) {
        return new RegistrationResponseDto(true, 'Registration successful');
      }
    } catch (error) {
      throw error;
    }
  }

  async loginUser(loginUserDto: UserDto): Promise<LoginResponseDto> {
    const { userEmail, userPassword } = loginUserDto;

    try {
      const user = await this.authDbService.loginUser(userEmail);
      if (user) {
        const userId = user.userId;
        if (await compare(userPassword, user.userPassword)) {
          const token: string = await this.jwtService.signAsync({
            userId,
            role: 'user',
          });
          return new LoginResponseDto(true, 'Login Successful', token);
        } else {
          throw new BadRequestException();
        }
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException('You are not registered. Please Register');
      } else if (error.status === 400) {
        throw new BadRequestException('Your password is incorrect. Try again');
      }
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
          throw new BadRequestException('Your password is incorrect');
        }
      }
      if (!user) {
        throw new UnauthorizedException('You are not admin. Bye');
      }
    } catch (error) {
      console.log(error);
      throw new BadGatewayException('Unable to log you in');
    }
  }
}
