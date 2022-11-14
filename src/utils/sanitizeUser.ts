import { User } from 'src/users/users.model';

export default function sanitizeUser(user: User) {
  const temp = JSON.parse(JSON.stringify(user));
  delete temp.password;
  delete temp.bloodId;
  delete temp.roleId;
  return temp;
}
