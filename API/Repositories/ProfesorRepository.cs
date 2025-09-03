using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class ProfesorRepository
    {
        private readonly ApplicationDbContext _context;

        public ProfesorRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Profesor>> GetAllAsync()
        {
            return await _context.Profesores
                .Include(p => p.Materias)
                .ToListAsync();
        }

        public async Task<Profesor?> GetByIdAsync(int id)
        {
            return await _context.Profesores
                .Include(p => p.Materias)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task AddAsync(Profesor profesor)
        {
            _context.Profesores.Add(profesor);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Profesor profesor)
        {
            _context.Profesores.Update(profesor);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var profesor = await _context.Profesores.FindAsync(id);
            if (profesor != null)
            {
                _context.Profesores.Remove(profesor);
                await _context.SaveChangesAsync();
            }
        }
    }
}
