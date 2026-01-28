using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SistemaGestionBeneficiarios.API.DTOs;
using SistemaGestionBeneficiarios.API.Repositories.Interfaces;

namespace SistemaGestionBeneficiarios.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BeneficiariosController : ControllerBase
    {
        private readonly IBeneficiarioRepository _repository;
        private readonly ILogger<BeneficiariosController> _logger;

        public BeneficiariosController(
        IBeneficiarioRepository repository,
        ILogger<BeneficiariosController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ObtenerTodos()
        {
            try
            {
                var beneficiarios = await _repository.ObtenerTodosAsync();
                return Ok(ApiResponse<object>.SuccessResponse(beneficiarios, "Beneficiarios obtenidos exitosamente"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener beneficiarios");
                return StatusCode(500, ApiResponse<object>.ErrorResponse(
                    "Error al obtener beneficiarios",
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
                var beneficiario = await _repository.ObtenerPorIdAsync(id);

                if (beneficiario == null)
                {
                    return NotFound(ApiResponse<object>.ErrorResponse("Beneficiario no encontrado"));
                }

                return Ok(ApiResponse<object>.SuccessResponse(beneficiario, "Beneficiario obtenido exitosamente"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener beneficiario con ID {Id}", id);
                return StatusCode(500, ApiResponse<object>.ErrorResponse(
                    "Error al obtener beneficiario",
                    new List<string> { ex.Message }
                ));
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Crear([FromBody] BeneficiarioDto beneficiarioDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                return BadRequest(ApiResponse<object>.ErrorResponse("Datos inválidos", errors));
            }

            try
            {
                var beneficiario = await _repository.CrearAsync(beneficiarioDto);
                return CreatedAtAction(
                    nameof(ObtenerPorId),
                    new { id = beneficiario.Id },
                    ApiResponse<object>.SuccessResponse(beneficiario, "Beneficiario creado exitosamente")
                );
            }
            catch (SqlException ex) when (ex.Message.Contains("Ya existe"))
            {
                _logger.LogWarning(ex, "Intento de crear beneficiario duplicado");
                return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear beneficiario");
                return StatusCode(500, ApiResponse<object>.ErrorResponse(
                    "Error al crear beneficiario",
                    new List<string> { ex.Message }
                ));
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Actualizar(int id, [FromBody] BeneficiarioDto beneficiarioDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                return BadRequest(ApiResponse<object>.ErrorResponse("Datos inválidos", errors));
            }

            try
            {
                var beneficiario = await _repository.ActualizarAsync(id, beneficiarioDto);

                if (beneficiario == null)
                {
                    return NotFound(ApiResponse<object>.ErrorResponse("Beneficiario no encontrado"));
                }

                return Ok(ApiResponse<object>.SuccessResponse(beneficiario, "Beneficiario actualizado exitosamente"));
            }
            catch (SqlException ex) when (ex.Message.Contains("Ya existe"))
            {
                _logger.LogWarning(ex, "Intento de actualizar con documento duplicado");
                return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al actualizar beneficiario con ID {Id}", id);
                return StatusCode(500, ApiResponse<object>.ErrorResponse(
                    "Error al actualizar beneficiario",
                    new List<string> { ex.Message }
                ));
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Eliminar(int id)
        {
            try
            {
                var eliminado = await _repository.EliminarAsync(id);

                if (!eliminado)
                {
                    return NotFound(ApiResponse<object>.ErrorResponse("Beneficiario no encontrado"));
                }

                return Ok(ApiResponse<object>.SuccessResponse(
                    new { Id = id },
                    "Beneficiario eliminado exitosamente"
                ));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al eliminar beneficiario con ID {Id}", id);
                return StatusCode(500, ApiResponse<object>.ErrorResponse(
                    "Error al eliminar beneficiario",
                    new List<string> { ex.Message }
                ));
            }
        }
    }
}
