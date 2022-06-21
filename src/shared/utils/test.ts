import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../app.module';

export const createTestAPI = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.enableShutdownHooks();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  return app;
};

export const loginGetToken = async (
  http: any,
  username: string,
  password: string,
): Promise<string> => {
  const res = await request(http)
    .post('/api/auth/login')
    .send({ username, password });
  return res.body.accessToken;
};

export class ApiTester {
  private http: any;
  private token: string;
  constructor(server: any) {
    this.http = request(server);
  }

  async login(username: string, password: string) {
    const response = await this.http
      .post('/api/auth/login')
      .send({ username, password });
    this.token = response.body.accessToken;
    return response;
  }

  get(url: string) {
    return this.http
      .get(url)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
  }

  post(url: string, data: any = {}) {
    return this.http
      .post(url)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.token}`)
      .send(data);
  }

  patch(url: string, data: any = {}) {
    return this.http
      .patch(url)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.token}`)
      .send(data);
  }

  delete(url: string) {
    return this.http
      .delete(url)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
  }
}
