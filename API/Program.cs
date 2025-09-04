using API.Data;
using API.Repositories;
using API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//conection string desde appsettings.json o variables de entorno
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? builder.Configuration["ConnectionString_DB"] ;

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

//Cors Policy

var mycorsPolicy = "_mycorsPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: mycorsPolicy,
                      policy =>
                      {
                      
                              policy.AllowAnyOrigin()
                                    .AllowAnyHeader()
                                    .AllowAnyMethod();

                      });
});
// Add services to the container.

builder.Services.AddScoped<EstudianteRepository>();
builder.Services.AddScoped<EstudianteService>();    
builder.Services.AddScoped<MateriaRepository>();
builder.Services.AddScoped<MateriaService>();
builder.Services.AddScoped<ProfesorRepository>();
builder.Services.AddScoped<ProfesorService>();
builder.Services.AddScoped<EstudianteMateriaRepository>();
builder.Services.AddScoped<EstudianteMateriaService>();



builder.Services.AddControllers()
    .AddJsonOptions(opt =>
    {
        opt.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        opt.JsonSerializerOptions.WriteIndented = true;
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();
    DbStartup.Seed(dbContext);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(mycorsPolicy);
app.UseAuthorization();

app.MapControllers();

app.Run();
