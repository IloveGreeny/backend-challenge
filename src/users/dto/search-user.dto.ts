import { IsOptional, IsString, IsInt } from 'class-validator';

export class SearchUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsInt()
  age?: number;
}