using Microsoft.AspNetCore.Mvc;
using SistemaGestionBeneficiarios.API.DTOs;
using SistemaGestionBeneficiarios.API.Repositories.Interfaces;

namespace SistemaGestionBeneficiarios.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentosIdentidadController : ControllerBase
    {
        private readonly IDocumentoIdentidadRepository _repository;
        private readonly ILogger<DocumentosIdentidadController> _logger;

        public DocumentosIdentidadController(
        IDocumentoIdentidadRepository repository,
        ILogger<DocumentosIdentidadController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("activos")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ObtenerActivos()
        {
            try
            {
                var documentos = await _repository.ObtenerActivosAsync();
                return Ok(ApiResponse<object>.SuccessResponse(documentos, "Documentos obtenidos exitosamente"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener documentos de identidad activos");
                return StatusCode(500, ApiResponse<object>.ErrorResponse(
                    "Error al obtener documentos de identidad",
                    new List<string> { ex.Message }
                ));
            }
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ObtenerTodos()
        {
            try
            {
                var documentos = await _repository.ObtenerTodosAsync();
                return Ok(ApiResponse<object>.SuccessResponse(documentos, "Documentos obtenidos exitosamente"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener todos los documentos de identidad");
                return StatusCode(500, ApiResponse<object>.ErrorResponse(
                    "Error al obtener documentos de identidad",
                    new List<string> { ex.Message }
                ));
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ObtenerPorId(int id)
        {
            try
            {
                var documento = await _repository.ObtenerPorIdAsync(id);

                if (documento == null)
                {
                    return NotFound(ApiResponse<object>.ErrorResponse("Documento de identidad no encontrado"));
                }

                return Ok(ApiResponse<object>.SuccessResponse(documento, "Documento obtenido exitosamente"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener documento de identidad con ID {Id}", id);
                return StatusCode(500, ApiResponse<object>.ErrorResponse(
                    "Error al obtener documento de identidad",
                    new List<string> { ex.Message }
                ));
            }
        }
    }
}
