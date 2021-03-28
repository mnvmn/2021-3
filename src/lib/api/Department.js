function ApiDepartment(base) {
  return {
    list: () => base.get('departments'),
  };
}

export default ApiDepartment;
