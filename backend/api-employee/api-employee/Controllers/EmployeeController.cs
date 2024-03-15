using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api_employee.Data;
using api_employee.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Reflection.Emit;
using api_employee.Services.EmployeeService;
using ThaiNationalIDCard;
using System.Text.RegularExpressions;

namespace api_employee.Controllers
{
   // private readonly IEmployeeService _employeeService;


    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeContext _context;
       // private readonly EmployeeIdGenerator _idGenerator;

        private readonly IEmployeeService _employeeService;

        public EmployeesController(EmployeeContext context,IEmployeeService employeeService)
        {
            _context = context;
           _employeeService = employeeService;
     //       _idGenerator = idGenerator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(string id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            if (employee == null)
            {
                return BadRequest();
            }
            if (EmployeeExistsIdCard(employee.IdCard))
            {
                return BadRequest("ID Card is exits active.");
            }


          if (!VerifyCitizenID(employee.IdCard))
            {
                return BadRequest("ID Card is wrong.");
            }


            if (employee.StartDate != string.Empty)
            {
                DateTime parsedDateTime;
                if (DateTime.TryParse(employee.StartDate, out parsedDateTime))
                {
                    employee.StartDatetime = parsedDateTime;
                }
                else
                {
                    return BadRequest("StartDatetime is not correct format.");
                }
            }

            //   employee.Id = EmployeeIdGeneratorService.GetNextId(_context);
            employee.Id = IdGenerator.GenerateId();
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(string id, Employee employee)
        {
            if (id != employee.Id)
            {
               // employee.Id = id;
                return BadRequest();
            }

            if (employee.StartDate != string.Empty)
            {
                DateTime parsedDateTime;
                if (DateTime.TryParse(employee.StartDate, out parsedDateTime))
                {
                    employee.StartDatetime = parsedDateTime;
                }
                else
                {
                    return BadRequest("StartDate is not correct format.");
                }
            }

            if (employee.EndDate != string.Empty)
            {
                DateTime parsedDateTime;
                if (DateTime.TryParse(employee.EndDate, out parsedDateTime))
                {
                    employee.EndDatetime = parsedDateTime;
                }
                else
                {
                    return BadRequest("EndDate is not correct format.");
                }
            }

            if (employee.EndDatetime < DateTime.UtcNow)
            {
                employee.Status = false;
            }


            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(string id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(string id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }

        private bool EmployeeExistsIdCard(string idCard)
        {
            return _context.Employees.Any(e => e.IdCard == idCard && e.Status);
        }

        

        private bool VerifyCitizenID(string citizenID)
        {
 
            if (citizenID.ToCharArray().All(c => char.IsNumber(c)) == false)
                return false;

       
            if (citizenID.Trim().Length != 13)
                return false;

            int sumValue = 0;

            for (int i = 0; i < citizenID.Length - 1; i++)
                sumValue += int.Parse(citizenID[i].ToString()) * (13 - i);

            int v = 11 - (sumValue % 11);

            return citizenID[12].ToString() == v.ToString();
        }
    }
}
