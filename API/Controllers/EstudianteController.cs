using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;



[ApiController]
[Route("api/[controller]")]
public class EstudiantesController : ControllerBase
{
    private readonly EstudianteService _service;

    public EstudiantesController(EstudianteService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var estudiante = await _service.GetByIdAsync(id);
        return estudiante == null ? NotFound() : Ok(estudiante);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] EstudianteDto dto)
    {
        var estudiante = new Estudiante
        {
            Nombre = dto.Nombre,
            Apellido = dto.Apellido,
            Edad = dto.Edad,
            Email = dto.Email
        };

        var result = await _service.RegisterAsync(estudiante, dto.MateriasIds);

        if (!result.Success)
            return BadRequest(result.Message);

        return Ok(result.Message);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Estudiante estudiante)
    {
        if (id != estudiante.Id) return BadRequest("ID no coincide");
        await _service.UpdateAsync(estudiante);
        return Ok("Estudiante actualizado");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return Ok("Estudiante eliminado");
    }
}

// DTO para simplificar el registro de estudiantes con materias
public class EstudianteDto
{
    public string Nombre { get; set; } = string.Empty;
    public string Apellido { get; set; } = string.Empty;
    public int Edad { get; set; }
    public string Email { get; set; } = string.Empty;
    public List<int> MateriasIds { get; set; } = new();
}

