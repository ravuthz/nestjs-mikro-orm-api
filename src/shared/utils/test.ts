import { EntityManager, MikroORM } from '@mikro-orm/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../../auth/auth.module';
import { DatabaseSeeder } from '../../database/seeders/DatabaseSeeder';
import { NoteModule } from '../../note/note.module';
import { PermissionModule } from '../../permission/permission.module';
import { RoleModule } from '../../role/role.module';
import { UserModule } from '../../user/user.module';
import { HttpTest } from '../http-test';
import { SharedModule } from '../shared.module';

let app: INestApplication;
let orm: MikroORM;
let generator;

// jest.setTimeout(10000);

export async function createTestingModule(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      SharedModule.init({ testing: true }),
      AuthModule,
      NoteModule,
      UserModule,
      RoleModule,
      PermissionModule,
    ],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.init();

  orm = app.get(MikroORM);

  generator = orm.getSchemaGenerator();

  await generator.ensureDatabase();
  await generator.generate();

  return app;
}

export async function closeTestingModule() {
  if (orm) {
    await orm.close(true);
  }
  if (app) {
    await app.close();
  }
}

export async function clearAllTables() {
  await generator.clearDatabase();
}

export async function createSeederTables() {
  const seeder = orm.getSeeder();
  await seeder.seed(DatabaseSeeder);
}

export function getEntityManager(): EntityManager<any> {
  if (!orm) {
    throw 'No orm was initialized!!!';
  }
  return orm.em;
}

export async function createAuthHttpTest() {
  const http = new HttpTest(app.getHttpServer());
  await http.login('adminz', '123123');
  return http;
}

export function createMockedFunctions(data: any[] = null) {
  const item = data ? data[0] : null;
  const items = data || [];

  const findAll: jest.Mock = jest.fn((query: any) =>
    Promise.resolve({ items }),
  );
  const findOne: jest.Mock = jest.fn((id: number) => Promise.resolve(item));
  const create: jest.Mock = jest.fn((body: any = {}) => Promise.resolve(item));
  const update: jest.Mock = jest.fn((id: number, body: any = {}) =>
    Promise.resolve(item),
  );
  const remove: jest.Mock = jest.fn((id: number) => Promise.resolve({}));
  return {
    findAll,
    findOne,
    create,
    update,
    remove,
  };
}

const { arrayContaining, objectContaining } = expect;

export { arrayContaining, objectContaining };
