import { permissions } from '../src/permission/permission.mock';
import {
  arrayContaining,
  closeTestingModule,
  createAuthHttpTest,
  createTestingModule,
  objectContaining,
} from '../src/shared/utils/test';

describe('Permissions REST API (e2e)', () => {
  const API_PERMISSION_URL = '/api/permissions';
  let http: any;
  let permissionId: number;

  const [createPermission, updatePermission] = permissions;

  const filterPermissionCols = ({ name, note }: any) => ({ name, note });

  const expectSimilarObject = (actual: any, expected: any) => {
    expect(actual).toMatchObject(filterPermissionCols(expected));
  };

  beforeAll(async () => {
    await createTestingModule();
    http = await createAuthHttpTest();
  });

  afterAll(async () => {
    await closeTestingModule();
  });

  it(`POST   ${API_PERMISSION_URL} \t should create and return permission with a status 201`, async () => {
    const response = await http
      .post(API_PERMISSION_URL, createPermission)
      .expect(201)
      .expect('Content-Type', /json/);

    permissionId = response.body.id;
    expectSimilarObject(response.body, createPermission);
  });

  it(`GET    ${API_PERMISSION_URL} \t should return array of permissions and status 200`, async () => {
    const response = await http
      .get(API_PERMISSION_URL)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body.items).toEqual(
      arrayContaining([
        objectContaining(filterPermissionCols(createPermission)),
      ]),
    );
  });

  it(`GET    ${API_PERMISSION_URL}/{id} \t should return a single permission and status 200`, async () => {
    const response = await http
      .get(`${API_PERMISSION_URL}/${permissionId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expectSimilarObject(response.body, createPermission);
  });

  it(`PATCH  ${API_PERMISSION_URL}/{id} \t should update and return permission with a status 200`, async () => {
    const response = await http
      .patch(`${API_PERMISSION_URL}/${permissionId}`, updatePermission)
      .expect(200)
      .expect('Content-Type', /json/);

    expectSimilarObject(response.body, updatePermission);
  });

  it(`DELETE ${API_PERMISSION_URL}/{id} \t should delete an return permission with a status 200`, async () => {
    const response = await http
      .delete(`${API_PERMISSION_URL}/${permissionId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({});
  });
});
