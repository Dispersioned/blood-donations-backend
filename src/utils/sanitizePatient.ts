import { Patient } from 'src/patients/patients.model';

export default function sanitizePatient(patient: Patient) {
  const temp = JSON.parse(JSON.stringify(patient));
  console.log('temp', JSON.stringify(temp));
  // delete temp.user.password;
  temp.user.createdAt = '';
  console.log('temp', JSON.stringify(temp));
  return temp;
}
