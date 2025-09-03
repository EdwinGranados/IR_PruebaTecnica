using API.Models;
using API.Repositories;

namespace API.Services
{
    public class EstudianteService
    {
        private readonly EstudianteRepository _repository;
        private readonly MateriaRepository _materiaRepository;

        public EstudianteService(EstudianteRepository repository, MateriaRepository materiaRepository)
        {
            _repository = repository;
            _materiaRepository = materiaRepository;
        }

        public async Task<List<Estudiante>> GetAllAsync()
            => await _repository.GetAllAsync();

        public async Task<Estudiante?> GetByIdAsync(int id)
            => await _repository.GetByIdAsync(id);

        public async Task<(bool Success, string Message)> RegisterAsync(Estudiante estudiante, List<int> materiasIds)
        {
            if (materiasIds.Count > 3)
                return (false, "El estudiante no puede inscribir más de 3 materias");

            var materias = await _materiaRepository.GetByIdsAsync(materiasIds);

            var profesores = materias.Select(m => m.ProfesorId).Distinct();
            if (profesores.Count() < materias.Count)
                return (false, "No se pueden inscribir dos materias con el mismo profesor");

            estudiante.EstudianteMaterias = materiasIds.Select(materiaId => new EstudianteMateria
            {
                Estudiante = estudiante,
                MateriaId = materiaId
            }).ToList();

            await _repository.AddAsync(estudiante);

            return (true, "Estudiante registrado con éxito");
        }

        public async Task UpdateAsync(Estudiante estudiante)
            => await _repository.UpdateAsync(estudiante);

        public async Task DeleteAsync(int id)
            => await _repository.DeleteAsync(id);
    }
}
