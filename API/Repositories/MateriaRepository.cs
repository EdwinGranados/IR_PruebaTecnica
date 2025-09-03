using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;    

namespace API.Repositories
{
    public class MateriaRepository
    {
        private readonly ApplicationDbContext _context;

        public MateriaRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Materia>> GetAllAsync()
        {
            return await _context.Materias
                .Include(m => m.Profesor)
                .Include(m => m.EstudianteMaterias)
                    .ThenInclude(em => em.Estudiante)
                .ToListAsync();
        }

        public async Task<Materia?> GetByIdAsync(int id)
        {
            return await _context.Materias
                .Include(m => m.Profesor)
                .Include(m => m.EstudianteMaterias)
                    .ThenInclude(em => em.Estudiante)
                .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<List<Materia>> GetByIdsAsync(List<int> ids)
        {
            return await _context.Materias
                .Include(m => m.Profesor)
                .Where(m => ids.Contains(m.Id))
                .ToListAsync();
        }

        public async Task AddAsync(Materia materia)
        {
            _context.Materias.Add(materia);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Materia materia)
        {
            _context.Materias.Update(materia);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var materia = await _context.Materias.FindAsync(id);
            if (materia != null)
            {
                _context.Materias.Remove(materia);
                await _context.SaveChangesAsync();
            }
        }
    }
}
