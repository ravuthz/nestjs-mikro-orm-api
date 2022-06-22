import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import {
  clearAllTables,
  closeTestingModule,
  createSeederTables,
  createTestingModule,
} from '../src/shared/utils/test';

const TOKEN_REGEX = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

describe('🚀 Authentication (e2e)', () => {
  let app: INestApplication;
  let http;

  beforeAll(async () => {
    app = await createTestingModule();
    await createSeederTables();
    http = app.getHttpServer();
  });

  afterAll(async () => {
    await clearAllTables();
    await closeTestingModule();
  });

  const login = (username: string, password: string) => {
    return request(http).post('/api/auth/login').send({ username, password });
  };

  const jsonGet = (url: string, token: string) => {
    return request(http)
      .get(url)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
  };

  const admin = {
    email: 'adminz@gmail.com',
    username: 'adminz',
  };

  const user = {
    email: 'ravuthz@gmail.com',
    username: 'ravuthz',
  };

  let adminToken: string;
  let userToken: string;

  describe('AuthModule', () => {
    it('🚷 fails to authenticate user with an incorrect password', async () => {
      const response = await login('adminz', 'wrong-password')
        .expect(401)
        .expect('Content-Type', /json/);
      expect(response.body.accessToken).not.toBeDefined();
    });

    /**
     * Testing Admin
     */

    describe('User authenticated with role [ADMIN]', () => {
      it('👻 authenticates user with valid credentials and provides a jwt token which have role as [ADMIN]', async () => {
        const response = await login('adminz', '123123')
          .expect(201)
          .expect('Content-Type', /json/);

        adminToken = response.body.accessToken;
        expect(adminToken).toMatch(TOKEN_REGEX);
      });

      it('😄 can see /api/auth/user', async () => {
        const response = await jsonGet('/api/auth/user', adminToken)
          .expect(200)
          .expect('Content-Type', /json/);
        expect(response.body).toMatchObject(admin);
      });

      it('😄 can see /api/auth/user-read', async () => {
        const response = await jsonGet('/api/auth/user-read', adminToken)
          .expect(200)
          .expect('Content-Type', /json/);

        expect(response.body).toMatchObject(admin);
      });

      it('😄 can see /api/auth/admin', async () => {
        const response = await jsonGet('/api/auth/admin', adminToken)
          .expect(200)
          .expect('Content-Type', /json/);
        expect(response.body).toMatchObject(admin);
      });

      it('😄 can see /api/auth/admin-read', async () => {
        const response = await jsonGet('/api/auth/admin-read', adminToken)
          .expect(200)
          .expect('Content-Type', /json/);

        expect(response.body).toMatchObject(admin);
      });
    });

    /**
     * Testing User
     */

    describe('User authenticated with role [USER]', () => {
      it('👻 authenticates user with valid credentials and provides a jwt token which have role as [USER]', async () => {
        const response = await login('ravuthz', '123123')
          .expect(201)
          .expect('Content-Type', /json/);

        userToken = response.body.accessToken;
        expect(userToken).toMatch(TOKEN_REGEX);
      });

      it('😄 can see /api/auth/user', async () => {
        const response = await jsonGet('/api/auth/user', userToken)
          .expect(200)
          .expect('Content-Type', /json/);

        expect(response.body).toMatchObject(user);
      });

      it('😄 can see /api/auth/user-read', async () => {
        const response = await jsonGet('/api/auth/user-read', userToken)
          .expect(200)
          .expect('Content-Type', /json/);

        expect(response.body).toMatchObject(user);
      });

      it('😎 cannot see /api/auth/admin', async () => {
        await jsonGet('/api/auth/admin', userToken)
          .expect(403)
          .expect('Content-Type', /json/);
      });

      it('😎 cannot see /api/auth/admin-read', async () => {
        const response = await jsonGet('/api/auth/admin-read', userToken)
          .expect(200)
          .expect('Content-Type', /json/);

        expect(response.body).toMatchObject(user);
      });
    });
  });
});
