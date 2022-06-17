import { Reflector } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsGuard } from './permissions.guard';

describe('PermissionsGuard', () => {
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
    }).compile();

    module.get(Reflector);
  });

  it('should be defined', () => {
    expect(new PermissionsGuard(reflector)).toBeDefined();
  });
});
