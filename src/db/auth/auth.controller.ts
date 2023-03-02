import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserDto } from 'src/dto/request/user.dto';
import { LoginResponseDto } from 'src/dto/response/login.response.dto';
import { RegistrationResponseDto } from 'src/dto/response/registration.response.dto';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { AuthService } from './auth.service';

@UseInterceptors(LoggingInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body() registerUserDto: UserDto,
  ): Promise<RegistrationResponseDto> {
    return await this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: UserDto): Promise<LoginResponseDto> {
    return await this.authService.loginUser(loginUserDto);
  }

  @Post('admin')
  async loginAdmin(@Body() loginAdminDto: UserDto): Promise<LoginResponseDto> {
    return await this.authService.loginAdmin(loginAdminDto);
  }
}
