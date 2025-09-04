using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public interface IEstudianteMateriaRepository
    {
        Task<List<EstudianteMateria>> GetMateriasPorEstudianteAsync(int estudianteId);
        Task<List<EstudianteMateria>> GetCompañerosPorMateriaAsync(int materiaId, int estudianteId);
    }

    public class EstudianteMateriaRepository : IEstudianteMateriaRepository
    {
        private readonly ApplicationDbContext _context;

        public EstudianteMateriaRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task InsertarAsync(int estudianteId, int materiaId)
        {
            var existente = await _context.EstudianteMaterias
                .AnyAsync(em => em.EstudianteId == estudianteId && em.MateriaId == materiaId);

            if (!existente)
            {
                var estudianteMateria = new EstudianteMateria
                {
                    EstudianteId = estudianteId,
                    MateriaId = materiaId
                };

                _context.EstudianteMaterias.Add(estudianteMateria);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<EstudianteMateria>> GetMateriasPorEstudianteAsync(int estudianteId)
        {
            return await _context.EstudianteMaterias
                .Include(em => em.Materia)
                .Where(em => em.EstudianteId == estudianteId)
                .ToListAsync();
        }

        public async Task<List<EstudianteMateria>> GetCompañerosPorMateriaAsync(int materiaId, int estudianteId)
        {
            return await _context.EstudianteMaterias
                .Include(em => em.Estudiante)
                .Where(em => em.MateriaId == materiaId && em.EstudianteId != estudianteId)
                .ToListAsync();
        }
    }

}
