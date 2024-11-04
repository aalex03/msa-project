using CommonSense.DataAccess;
using CommonSense.Domain.Interfaces;
using CommonSense.Domain.Models;
using CommonSense.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// singleton only for testing
builder.Services.AddScoped<IRepository<User>, EfCoreUserRepository<User>>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddDbContext<CommonSenseContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("CommonSense.API")));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
