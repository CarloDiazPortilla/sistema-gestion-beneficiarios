using Dapper;
using Microsoft.Data.SqlClient;
using SistemaGestionBeneficiarios.API.DTOs;
using SistemaGestionBeneficiarios.API.Models;
using SistemaGestionBeneficiarios.API.Repositories.Interfaces;
using System.Data;

namespace SistemaGestionBeneficiarios.API.Repositories
{
    public class BeneficiarioRepository : IBeneficiarioRepository
    {
        private readonly string _connectionString;

        public BeneficiarioRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") 
                                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        }

        public async Task<IEnumerable<Beneficiario>> ObtenerTodosAsync()
        {
            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryAsync<Beneficiario>(
                "SP_ListarBeneficiarios",
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<Beneficiario?> ObtenerPorIdAsync(int id)
        {
            using var connection = new SqlConnection(_connectionString);

            var parameters = new { Id = id };

            return await connection.QueryFirstOrDefaultAsync<Beneficiario>(
                "SP_ObtenerBeneficiarioPorId",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<Beneficiario> CrearAsync(BeneficiarioDto beneficiarioDto)
        {
            using var connection = new SqlConnection(_connectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@Nombres", beneficiarioDto.Nombres);
            parameters.Add("@Apellidos", beneficiarioDto.Apellidos);
            parameters.Add("@DocumentoIdentidadId", beneficiarioDto.DocumentoIdentidadId);
            parameters.Add("@NumeroDocumento", beneficiarioDto.NumeroDocumento);
            parameters.Add("@FechaNacimiento", beneficiarioDto.FechaNacimiento);
            parameters.Add("@Sexo", beneficiarioDto.Sexo);
            parameters.Add("@NuevoId", dbType: DbType.Int32, direction: ParameterDirection.Output);

            var result = await connection.QueryFirstOrDefaultAsync<Beneficiario>(
                "SP_CrearBeneficiario",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return result ?? throw new InvalidOperationException("No se pudo crear el beneficiario");
        }

        public async Task<Beneficiario?> ActualizarAsync(int id, BeneficiarioDto beneficiarioDto)
        {
            using var connection = new SqlConnection(_connectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@Id", id);
            parameters.Add("@Nombres", beneficiarioDto.Nombres);
            parameters.Add("@Apellidos", beneficiarioDto.Apellidos);
            parameters.Add("@DocumentoIdentidadId", beneficiarioDto.DocumentoIdentidadId);
            parameters.Add("@NumeroDocumento", beneficiarioDto.NumeroDocumento);
            parameters.Add("@FechaNacimiento", beneficiarioDto.FechaNacimiento);
            parameters.Add("@Sexo", beneficiarioDto.Sexo);

            return await connection.QueryFirstOrDefaultAsync<Beneficiario>(
                "SP_ActualizarBeneficiario",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<bool> EliminarAsync(int id)
        {
            using var connection = new SqlConnection(_connectionString);

            var parameters = new { Id = id };

            var result = await connection.QueryFirstOrDefaultAsync<dynamic>(
                "SP_EliminarBeneficiario",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return result?.Eliminado == 1;
        }
    }
}
