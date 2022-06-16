import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class RegisterUserDto extends PartialType(CreateUserDto) {}
