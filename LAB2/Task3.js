function updateEmployeeDetails(employee, newRole) {
    return { ...employee, role: newRole };
  }
  const emp = { name: 'Hansika', role: 'Developer', age: 20, location: 'IN' };
  const updemp = updateEmployeeDetails(emp, 'Senior Developer');
  console.log(updemp);
  