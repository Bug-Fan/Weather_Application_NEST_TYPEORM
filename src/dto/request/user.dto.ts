import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  @MinLength(3)
  userPassword: string;
}
