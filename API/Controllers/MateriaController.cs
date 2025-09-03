using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MateriasController : ControllerBase
    {
        private readonly MateriaService _service;

        public MateriasController(MateriaService service)
        {
            _service = service;
        }

        // GET: api/materias
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAllAsync());

        // GET: api/materias/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var materia = await _service.GetByIdAsync(id);
            return materia == null ? NotFound() : Ok(materia);
        }

        // POST: api/materias
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Materia materia)
        {
            await _service.AddAsync(materia);
            return Ok("Materia creada con éxito");
        }

        // PUT: api/materias/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Materia materia)
        {
            if (id != materia.Id) return BadRequest("El ID no coincide");
            await _service.UpdateAsync(materia);
            return Ok("Materia actualizada con éxito");
        }

        // DELETE: api/materias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return Ok("Materia eliminada con éxito");
        }
    }
}
