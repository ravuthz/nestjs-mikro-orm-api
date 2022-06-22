import {
  arrayContaining,
  clearAllTables,
  closeTestingModule,
  createAuthHttpTest,
  createTestingModule,
  objectContaining,
} from '../src/shared/utils/test';

describe('Notes REST API (e2e)', () => {
  const API_NOTE_URL = '/api/notes';
  let http: any;
  let noteId: number;

  const createNote = {
    name: 'Create Test with Jest',
    note: 'Create Test with Jest',
  };

  const updateNote = {
    name: 'Create Test with Jest and SuperTest',
    note: 'Create Test with Jest and SuperTest',
  };

  beforeAll(async () => {
    const app = await createTestingModule();
    http = app.getHttpServer();
    // await createSeederTables();
  });

  beforeAll(async () => {
    // await createTestingModule();
    http = await createAuthHttpTest();
  });

  afterAll(async () => {
    await clearAllTables();
    await closeTestingModule();
  });

  it(`POST   ${API_NOTE_URL} \t should create and return note with a status 201`, async () => {
    const response = await http
      .post(API_NOTE_URL, createNote)
      .expect(201)
      .expect('Content-Type', /json/);

    noteId = response.body.id;
    const { name, note } = createNote;
    expect(response.body).toMatchObject({ id: noteId, name, note });
  });

  it(`GET    ${API_NOTE_URL} \t should return array of notes and status 200`, async () => {
    const response = await http
      .get(API_NOTE_URL)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body.items).toEqual(
      arrayContaining([objectContaining(createNote)]),
    );
  });

  it(`GET    ${API_NOTE_URL}/{id} \t should return a single note and status 200`, async () => {
    const response = await http
      .get(`${API_NOTE_URL}/${noteId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject(createNote);
  });

  it(`PATCH  ${API_NOTE_URL}/{id} \t should update and return note with a status 200`, async () => {
    const response = await http
      .patch(`${API_NOTE_URL}/${noteId}`, updateNote)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject(updateNote);
  });

  it(`DELETE ${API_NOTE_URL}/{id} \t should delete an return note with a status 200`, async () => {
    const response = await http
      .delete(`${API_NOTE_URL}/${noteId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({});
  });
});
