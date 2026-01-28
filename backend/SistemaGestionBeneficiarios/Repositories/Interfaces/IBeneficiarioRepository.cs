using SistemaGestionBeneficiarios.API.Models;
using SistemaGestionBeneficiarios.API.DTOs;

namespace SistemaGestionBeneficiarios.API.Repositories.Interfaces
{
    public interface IBeneficiarioRepository
    {
        Task<IEnumerable<Beneficiario>> ObtenerTodosAsync();
        Task<Beneficiario?> ObtenerPorIdAsync(int id);
        Task<Beneficiario> CrearAsync(BeneficiarioDto beneficiarioDto);
        Task<Beneficiario?> ActualizarAsync(int id, BeneficiarioDto beneficiarioDto);
        Task<bool> EliminarAsync(int id);
    }
}
