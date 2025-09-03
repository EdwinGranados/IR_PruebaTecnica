using API.Models;
using API.Repositories;

namespace API.Services
{
    public class ProfesorService
    {
        private readonly ProfesorRepository _repository;

        public ProfesorService(ProfesorRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Profesor>> GetAllAsync()
            => await _repository.GetAllAsync();

        public async Task<Profesor?> GetByIdAsync(int id)
            => await _repository.GetByIdAsync(id);

        public async Task AddAsync(Profesor profesor)
            => await _repository.AddAsync(profesor);

        public async Task UpdateAsync(Profesor profesor)
            => await _repository.UpdateAsync(profesor);

        public async Task DeleteAsync(int id)
            => await _repository.DeleteAsync(id);
    }
}
