using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class EstudianteRepository
    {
        private readonly ApplicationDbContext _context;

        public EstudianteRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Estudiante>> GetAllAsync()
        {
            return await _context.Estudiantes
                .Include(e => e.EstudianteMaterias)
                    .ThenInclude(em => em.Materia)
                        .ThenInclude(m => m.Profesor)
                .ToListAsync();
        }

        public async Task<Estudiante?> GetByIdAsync(int id)
        {
            return await _context.Estudiantes
                .Include(e => e.EstudianteMaterias)
                    .ThenInclude(em => em.Materia)
                        .ThenInclude(m => m.Profesor)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task AddAsync(Estudiante estudiante)
        {
            _context.Estudiantes.Add(estudiante);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Estudiante estudiante)
        {
            _context.Estudiantes.Update(estudiante);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var estudiante = await _context.Estudiantes.FindAsync(id);
            if (estudiante != null)
            {
                _context.Estudiantes.Remove(estudiante);
                await _context.SaveChangesAsync();
            }
        }
    }
}
