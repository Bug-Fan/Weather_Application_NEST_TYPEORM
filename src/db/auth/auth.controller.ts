import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/dto/request/user.dto';
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
}
