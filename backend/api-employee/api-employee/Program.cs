using api_employee.Data;
using api_employee.Models;
using api_employee.Services.EmployeeService;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var allowedOrigin = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("myAppCors", policy =>
    {
        policy.WithOrigins(allowedOrigin)
                .AllowAnyHeader()
                .AllowCredentials()
                .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

builder.Services.AddScoped<IEmployeeService, EmployeeService>();
//builder.Services.AddScoped<IEmployeeIdGeneratorService, EmployeeIdGeneratorService>();
builder.Services.AddDbContext<EmployeeContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});


// Add services 
//builder.Services.AddDbContext<FinanceDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("FinanceDb")));


//builder.Services.AddScoped<IEmployeeService, EmployeeService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseRouting();

app.UseCors("myAppCors");
//app.UseCors(builder =>
//{
//    builder
//    .WithOrigins("http://localhost:3000")
//    .AllowAnyOrigin()
//    .AllowAnyMethod()
//    .AllowAnyHeader();
//});
app.UseHttpsRedirection();

app.UseAuthorization();


app.MapControllers();



//app.UseCors(options => options
//       .WithOrigins("*") // Replace with your frontend origin(s)
//         .AllowAnyOrigin()
//       .AllowAnyMethod()
//       .AllowAnyHeader());



app.Run();
