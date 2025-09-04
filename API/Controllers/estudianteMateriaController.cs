using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstudianteMController : ControllerBase
    {

        public readonly EstudianteMateriaService _service;
        public EstudianteMController(EstudianteMateriaService service)
        {
            _service = service;
        }

        [HttpPost("inscribir")]
        public async Task<IActionResult> Inscribir([FromBody] InscripcionDto dto)
        {
            if (dto.MateriasIds.Count == 0 || dto.MateriasIds.Count > 3)
                return BadRequest("Debe enviar entre 1 y 3 materias.");

            await _service.InscribirEstudianteMultipleAsync(dto.EstudianteId, dto.MateriasIds);
            return Ok(new { message = "Estudiante inscrito correctamente en las materias" });
        }

        [HttpGet("{estudianteId}/materias-compañeros")]
        public async Task<IActionResult> GetMateriasConCompañeros(int estudianteId)
        {
            var resultado = await _service.GetMateriasConCompañerosAsync(estudianteId);
            return Ok(resultado);
        }
    }
    public class InscripcionDto
    {
        public int EstudianteId { get; set; }
        public List<int> MateriasIds { get; set; } = new();
    }

}
