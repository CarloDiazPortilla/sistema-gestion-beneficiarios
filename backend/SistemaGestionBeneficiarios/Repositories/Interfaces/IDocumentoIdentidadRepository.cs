using SistemaGestionBeneficiarios.API.Models;

namespace SistemaGestionBeneficiarios.API.Repositories.Interfaces
{
    public interface IDocumentoIdentidadRepository
    {
        Task<IEnumerable<DocumentoIdentidad>> ObtenerTodosAsync();
        Task<IEnumerable<DocumentoIdentidad>> ObtenerActivosAsync();
        Task<DocumentoIdentidad?> ObtenerPorIdAsync(int id);
    }
}
