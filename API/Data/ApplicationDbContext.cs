using API.Models;
using Microsoft.EntityFrameworkCore;
namespace API.Data
{
    public class ApplicationDbContext :DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Estudiante> Estudiantes { get; set; } = null!;
        public DbSet<Materia> Materias { get; set; } = null!;
        public DbSet<Profesor> Profesores { get; set; } = null!;
        public DbSet<EstudianteMateria> EstudianteMaterias { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<EstudianteMateria>()
                .HasKey(em => new { em.EstudianteId, em.MateriaId });


            modelBuilder.Entity<EstudianteMateria>()
                .HasOne(em => em.Estudiante)
                .WithMany(e => e.EstudianteMaterias)
                .HasForeignKey(em => em.EstudianteId);


            modelBuilder.Entity<EstudianteMateria>()
                .HasOne(em => em.Materia)
                .WithMany(m => m.EstudianteMaterias)
                .HasForeignKey(em => em.MateriaId);
        }
    }
}
