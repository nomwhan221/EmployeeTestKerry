using api_employee.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
namespace api_employee.Data
{



    public class EmployeeContext : DbContext
    {
        //Dbcontext implementation
        public EmployeeContext(DbContextOptions options) : base(options)
        {
        }
     
      //  public DbSet<EmployeeIdGenerator> EmployeeIdGenerators { get; set; }
        public DbSet<Employee> Employees { get; set; }

    }

    public class EmployeeContextFactory : IDesignTimeDbContextFactory<EmployeeContext>
    {
      

        public EmployeeContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();

            var optionsBuilder = new DbContextOptionsBuilder();

            var connectionString = configuration
                        .GetConnectionString("DefaultConnection");

            optionsBuilder.UseSqlServer(connectionString);

            return new EmployeeContext(optionsBuilder.Options);
        }
    }

   
}