using API.Models;
namespace API.Data
{
    public class DbStartup
    {
        public static void Seed(ApplicationDbContext context)
        {
            if (!context.Profesores.Any())
            {
                var profesores = new List<Profesor>
                {
                     new Profesor { Nombre = "Profesor Juan" },
                new Profesor { Nombre = "Profesor María" },
                new Profesor { Nombre = "Profesor Pedro" },
                new Profesor { Nombre = "Profesor Ana" },
                new Profesor { Nombre = "Profesor Luis" }
                };
                context.Profesores.AddRange(profesores);
                context.SaveChanges();

                var materias = new List<Materia>
            {
                new Materia { Nombre = "Matemáticas I", ProfesorId = profesores[0].Id },
                new Materia { Nombre = "Matemáticas II", ProfesorId = profesores[0].Id },

                new Materia { Nombre = "Lengua I", ProfesorId = profesores[1].Id },
                new Materia { Nombre = "Lengua II", ProfesorId = profesores[1].Id },

                new Materia { Nombre = "Historia I", ProfesorId = profesores[2].Id },
                new Materia { Nombre = "Historia II", ProfesorId = profesores[2].Id },

                new Materia { Nombre = "Ciencias I", ProfesorId = profesores[3].Id },
                new Materia { Nombre = "Ciencias II", ProfesorId = profesores[3].Id },

                new Materia { Nombre = "Arte I", ProfesorId = profesores[4].Id },
                new Materia { Nombre = "Arte II", ProfesorId = profesores[4].Id },

            };

                context.Materias.AddRange(materias);
                context.SaveChanges();
            }

            if (!context.Estudiantes.Any())
            {
                var estudiantes = new List<Estudiante>
                {
                    new Estudiante { Nombre = "Ana", Apellido = "Martínez", Edad = 20 },
                    new Estudiante { Nombre = "Luis", Apellido = "Rodríguez", Edad = 22 },
                    new Estudiante { Nombre = "Sofía", Apellido = "Hernández", Edad = 19 }
                };
                context.Estudiantes.AddRange(estudiantes);
                context.SaveChanges();
            }
        }
    }
}
