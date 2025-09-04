using API.Repositories;

namespace API.Services
{
    public class EstudianteMateriaService
    {
        private readonly EstudianteMateriaRepository _repository;

        public EstudianteMateriaService(EstudianteMateriaRepository repository)
        {
            _repository = repository;
        }

        public async Task InsertarAsync(int estudianteId, int materiaId)
            => await _repository.InsertarAsync(estudianteId, materiaId);

        public async Task<List<MateriaConCompañerosDto>> GetMateriasConCompañerosAsync(int estudianteId)
        {
            var materiasDelEstudiante = await _repository.GetMateriasPorEstudianteAsync(estudianteId);
            var resultado = new List<MateriaConCompañerosDto>();

            foreach (var em in materiasDelEstudiante)
            {
                var compañeros = await _repository.GetCompañerosPorMateriaAsync(em.MateriaId, estudianteId);

                resultado.Add(new MateriaConCompañerosDto
                {
                    MateriaId = em.Materia.Id,
                    MateriaNombre = em.Materia.Nombre,
                    estudiantes = compañeros.Select(c => new CompañeroDto
                    {
                        Id = c.Estudiante.Id,
                        Nombre = c.Estudiante.Nombre,
                        Apellido = c.Estudiante.Apellido,
                        Email = c.Estudiante.Email
                    }).ToList()
                });
            }

            return resultado;
        }

        public async Task InscribirEstudianteMultipleAsync(int estudianteId, List<int> materiasIds)
        {
            foreach (var materiaId in materiasIds)
            {
                await _repository.InsertarAsync(estudianteId, materiaId);
            }
        }
        public class MateriaConCompañerosDto
        {
            public int MateriaId { get; set; }
            public string MateriaNombre { get; set; } = string.Empty;
            public List<CompañeroDto> estudiantes { get; set; } = new();
        }

        public class CompañeroDto
        {
            public int Id { get; set; }
            public string Nombre { get; set; } = string.Empty;
            public string Apellido { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
        }
    }
}
