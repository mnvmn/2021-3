function ApiEmployee(base) {
  return {
    list: () => base.get('employees'),
    get: (id) => base.get(`employees/${id}`),
  };
}

export default ApiEmployee;
