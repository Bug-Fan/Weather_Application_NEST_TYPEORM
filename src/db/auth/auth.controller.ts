import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/dto/request/user.dto';
import { LoginResponseDto } from 'src/dto/response/login.response.dto';
import { RegistrationResponseDto } from 'src/dto/response/registration.response.dto';
import { AuthService } from './auth.service';

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
    console.log(process.env.JWT_SECRET_KEY);
    return await this.authService.loginUser(loginUserDto);
  }
}
