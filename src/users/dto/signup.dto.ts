import { IsEmail, IsNotEmpty, IsString, MinLength, IsInt } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  age: number;
}
