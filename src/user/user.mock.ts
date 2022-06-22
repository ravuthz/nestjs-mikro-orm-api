import { User } from './entities/user.entity';

const users: User[] = [
  new User({
    firstName: 'demo1',
    lastName: 'user',
    email: 'ravuthz+1001@gmail.com',
    username: 'demo1',
    password: '123123',
    profileImage: '',
    createdAt: new Date('2022-06-24T07:35:32.808Z'),
    updatedAt: new Date('2022-06-24T07:35:41.001Z'),
  }),
  new User({
    firstName: 'demo2',
    lastName: 'user',
    email: 'ravuthz+1002@gmail.com',
    username: 'demo2',
    password: '123456',
    profileImage: '',
    createdAt: new Date('2022-06-24T07:35:37.259Z'),
    updatedAt: new Date('2022-06-24T07:35:41.001Z'),
  }),
];

const user = users[0];

export { users, user };
