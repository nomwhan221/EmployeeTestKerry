using api_employee.Models;
using Microsoft.AspNetCore.Mvc;

namespace api_employee.Services.EmployeeService
{
    public interface IEmployeeService
    {
        List<Employee> GetEmployees();
        Employee GetEmployee(int id);
        Employee PostEmployee(Employee employee);
        IActionResult PutEmployee(string id, Employee employee);
        IActionResult DeleteEmployee(int id);
    }
}
