using AlunosApi.Models;
using AlunosApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace AlunosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunosController : ControllerBase
    {
        private IAlunoService _alunoService;

        public AlunosController(IAlunoService alunoService)
        {
            _alunoService = alunoService;
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> GetAlunos()
        {
            try
            {
                var alunos = await _alunoService.GetAlunos();
                return Ok(alunos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError,"Erro ao obter Alunos.");
            }
        }

        [HttpGet("AlunosPorNome")]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> GetAlunosByName([FromQuery] string nome)
        {
            try
            {
                var alunos = await _alunoService.GetAlunosByNome(nome);

                if (alunos.Count() == 0)
                    return NotFound($"Não existem alunos com o critério {nome}");


                return Ok(alunos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao obter Alunos.");
            }
        }

        [HttpGet("{id:int}", Name="GetAluno")]
        public async Task<ActionResult<Aluno>> GetAluno(int id)
        {
            try
            {
                var aluno = await _alunoService.GetAluno(id);

                if (aluno == null)
                    return NotFound($"Não existe aluno com o Id= {id}");


                return Ok(aluno);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao obter Aluno.");
            }
        }

    }
}
