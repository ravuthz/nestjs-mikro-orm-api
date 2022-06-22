import { HttpServer } from '@nestjs/common';
import request from 'supertest';

export class HttpTest {
  private http: any;
  private token: string;
  constructor(server: HttpServer) {
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
