import { Unique } from '@mikro-orm/core';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Unique()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  profileImage?: string;
}
