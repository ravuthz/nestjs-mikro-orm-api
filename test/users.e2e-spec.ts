import {
  arrayContaining,
  closeTestingModule,
  createAuthHttpTest,
  createTestingModule,
  objectContaining,
} from '../src/shared/utils/test';
import { users } from '../src/user/user.mock';

describe('Users REST API (e2e)', () => {
  const API_USER_URL = '/api/users';
  let http: any;
  let userId: number;

  const [createUser, updateUser] = users;

  const filterUserCols = ({ email, username, firstName, lastName }: any) => {
    return { email, username, firstName, lastName };
  };

  const expectSimilarObject = (actual: any, expected: any) => {
    expect(actual).toMatchObject(filterUserCols(expected));
  };

  beforeAll(async () => {
    await createTestingModule();
    http = await createAuthHttpTest();
  });

  afterAll(async () => {
    await closeTestingModule();
  });

  it(`POST   ${API_USER_URL} \t should create and return user with a status 201`, async () => {
    const response = await http
      .post(API_USER_URL, createUser)
      .expect(201)
      .expect('Content-Type', /json/);

    userId = response.body.id;
    expectSimilarObject(response.body, createUser);
  });

  it(`GET    ${API_USER_URL} \t should return array of users and status 200`, async () => {
    const response = await http
      .get(API_USER_URL)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body.items).toEqual(
      arrayContaining([objectContaining(filterUserCols(createUser))]),
    );
  });

  it(`GET    ${API_USER_URL}/{id} \t should return a single user and status 200`, async () => {
    const response = await http
      .get(`${API_USER_URL}/${userId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expectSimilarObject(response.body, createUser);
  });

  it(`PATCH  ${API_USER_URL}/{id} \t should update and return user with a status 200`, async () => {
    const response = await http
      .patch(`${API_USER_URL}/${userId}`, updateUser)
      .expect(200)
      .expect('Content-Type', /json/);

    expectSimilarObject(response.body, updateUser);
  });

  it(`DELETE ${API_USER_URL}/{id} \t should delete an return user with a status 200`, async () => {
    const response = await http
      .delete(`${API_USER_URL}/${userId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({});
  });
});
