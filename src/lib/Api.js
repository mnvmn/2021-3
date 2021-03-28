import axios from 'axios';
import ApiEmployee from './api/Employee';
import ApiDepartment from './api/Department';

function Api() {
  const base = axios.create({
    baseURL: 'http://localhost:3001',
  });

  return {
    base,
    employee: ApiEmployee(base),
    department: ApiDepartment(base),
  };
}

export default Api;
