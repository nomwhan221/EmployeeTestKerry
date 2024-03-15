using api_employee.Models;
using Microsoft.AspNetCore.Mvc;

namespace api_employee.Services.EmployeeService
{
    public class EmployeeService : IEmployeeService
    {
        public IActionResult DeleteEmployee(int id)
        {
            throw new NotImplementedException();
        }

        public Employee GetEmployee(int id)
        {
            throw new NotImplementedException();
        }

        public List<Employee> GetEmployees()
        {
            throw new NotImplementedException();
        }

        public Employee PostEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }

        public IActionResult PutEmployee(string id, Employee employee)
        {
            throw new NotImplementedException();
        }
    }
}
