using API.Models;
using API.Repositories;

namespace API.Services
{
    public class MateriaService
    {
        private readonly MateriaRepository _repository;

        public MateriaService(MateriaRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Materia>> GetAllAsync()
            => await _repository.GetAllAsync();

        public async Task<Materia?> GetByIdAsync(int id)
            => await _repository.GetByIdAsync(id);

        public async Task AddAsync(Materia materia)
            => await _repository.AddAsync(materia);

        public async Task UpdateAsync(Materia materia)
            => await _repository.UpdateAsync(materia);

        public async Task DeleteAsync(int id)
            => await _repository.DeleteAsync(id);
    }
}
