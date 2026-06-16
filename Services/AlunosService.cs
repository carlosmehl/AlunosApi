using AlunosApi.Context;
using AlunosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AlunosApi.Services
{
    public class AlunosService : IAlunoService
    {
        private readonly AppDbContext _context;

        public AlunosService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateAluno(Aluno aluno)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteAluno(Aluno aluno)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Aluno>> GetAluno(int id)
        {
            try
            {
                return await _context.Alunos.ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<Aluno>> GetAlunos()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Aluno>> GetAlunosByNome(string nome)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateAluno(Aluno aluno)
        {
            throw new NotImplementedException();
        }
    }
}
