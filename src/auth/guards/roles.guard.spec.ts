import { Reflector } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
    }).compile();

    module.get(Reflector);
  });

  it('should be defined', () => {
    expect(new RolesGuard(reflector)).toBeDefined();
  });
});
