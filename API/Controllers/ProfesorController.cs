using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfesoresController : ControllerBase
    {
        private readonly ProfesorService _service;

        public ProfesoresController(ProfesorService service)
        {
            _service = service;
        }

        // GET: api/profesores
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAllAsync());

        // GET: api/profesores/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var profesor = await _service.GetByIdAsync(id);
            return profesor == null ? NotFound() : Ok(profesor);
        }

        // POST: api/profesores
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Profesor profesor)
        {
            await _service.AddAsync(profesor);
            return Ok("Profesor creado con éxito");
        }

        // PUT: api/profesores/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Profesor profesor)
        {
            if (id != profesor.Id) return BadRequest("El ID no coincide");
            await _service.UpdateAsync(profesor);
            return Ok("Profesor actualizado con éxito");
        }

        // DELETE: api/profesores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return Ok("Profesor eliminado con éxito");
        }
    }
}
