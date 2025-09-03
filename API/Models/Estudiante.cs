namespace API.Models
{
    public class Estudiante
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public int Edad { get; set; }
        public string Email { get; set; } = string.Empty;

        public ICollection<EstudianteMateria> EstudianteMaterias { get; set; }  = new List<EstudianteMateria>();
    }
}
