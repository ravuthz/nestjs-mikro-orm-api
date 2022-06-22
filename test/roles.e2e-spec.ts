import { roles } from '../src/role/role.mock';
import {
  arrayContaining,
  closeTestingModule,
  createAuthHttpTest,
  createTestingModule,
  objectContaining,
} from '../src/shared/utils/test';

describe('Roles REST API (e2e)', () => {
  const API_ROLE_URL = '/api/roles';
  let http: any;
  let roleId: number;

  const [createRole, updateRole] = roles;

  const filterRoleCols = ({ name, note }: any) => ({ name, note });

  const expectSimilarObject = (actual: any, expected: any) => {
    expect(actual).toMatchObject(filterRoleCols(expected));
  };

  beforeAll(async () => {
    await createTestingModule();
    http = await createAuthHttpTest();
  });

  afterAll(async () => {
    await closeTestingModule();
  });

  it(`POST   ${API_ROLE_URL} \t should create and return role with a status 201`, async () => {
    const response = await http
      .post(API_ROLE_URL, createRole)
      .expect(201)
      .expect('Content-Type', /json/);

    roleId = response.body.id;
    expectSimilarObject(response.body, createRole);
  });

  it(`GET    ${API_ROLE_URL} \t should return array of roles and status 200`, async () => {
    const response = await http
      .get(API_ROLE_URL)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body.items).toEqual(
      arrayContaining([objectContaining(filterRoleCols(createRole))]),
    );
  });

  it(`GET    ${API_ROLE_URL}/{id} \t should return a single role and status 200`, async () => {
    const response = await http
      .get(`${API_ROLE_URL}/${roleId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expectSimilarObject(response.body, createRole);
  });

  it(`PATCH  ${API_ROLE_URL}/{id} \t should update and return role with a status 200`, async () => {
    const response = await http
      .patch(`${API_ROLE_URL}/${roleId}`, updateRole)
      .expect(200)
      .expect('Content-Type', /json/);

    expectSimilarObject(response.body, updateRole);
  });

  it(`DELETE ${API_ROLE_URL}/{id} \t should delete an return role with a status 200`, async () => {
    const response = await http
      .delete(`${API_ROLE_URL}/${roleId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({});
  });
});
