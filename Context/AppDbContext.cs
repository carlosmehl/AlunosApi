using AlunosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AlunosApi.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {
        }
        public DbSet<Aluno> Alunos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aluno>().HasData(
                new Aluno
                {
                    Id = 1,
                    Nome = "Maria Silva",
                    Email = "MariaSilva@gmail.com",
                    Idade = 22
                },
                new Aluno
                {
                    Id = 2,
                    Nome = "Joao Sousa",
                    Email = "JoaoSousa@gmail.com",
                    Idade = 23
                }
                );
        }
    }
}
