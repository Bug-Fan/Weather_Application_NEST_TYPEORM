import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ForecastRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  location: string;
}
