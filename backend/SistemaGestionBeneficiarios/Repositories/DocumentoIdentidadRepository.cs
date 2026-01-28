using Dapper;
using Microsoft.Data.SqlClient;
using SistemaGestionBeneficiarios.API.Models;
using SistemaGestionBeneficiarios.API.Repositories.Interfaces;
using System.Data;

namespace SistemaGestionBeneficiarios.API.Repositories
{
    public class DocumentoIdentidadRepository : IDocumentoIdentidadRepository
    {
        private readonly string _connectionString;

        public DocumentoIdentidadRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        }

        public async Task<IEnumerable<DocumentoIdentidad>> ObtenerTodosAsync()
        {
            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryAsync<DocumentoIdentidad>(
                "SP_ListarTodosDocumentosIdentidad",
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<DocumentoIdentidad>> ObtenerActivosAsync()
        {
            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryAsync<DocumentoIdentidad>(
                "SP_ListarDocumentosIdentidadActivos",
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<DocumentoIdentidad?> ObtenerPorIdAsync(int id)
        {
            using var connection = new SqlConnection(_connectionString);

            var parameters = new { Id = id };

            return await connection.QueryFirstOrDefaultAsync<DocumentoIdentidad>(
                "SP_ObtenerDocumentoIdentidadPorId",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }
    }
}
