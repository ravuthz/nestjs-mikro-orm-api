import { Unique } from '@mikro-orm/core';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

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
  @Exclude()
  password: string;

  @IsOptional()
  profileImage?: string;
}
