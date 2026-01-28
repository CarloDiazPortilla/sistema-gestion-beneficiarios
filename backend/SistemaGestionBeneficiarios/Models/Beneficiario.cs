namespace SistemaGestionBeneficiarios.API.Models
{
    public class Beneficiario
    {
        public int Id { get; set; }
        public string Nombres { get; set; } = string.Empty;
        public string Apellidos { get; set; } = string.Empty;
        public int DocumentoIdentidadId { get; set; }
        public string NumeroDocumento { get; set; } = string.Empty;
        public DateTime FechaNacimiento { get; set; }
        public char Sexo { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }

        // Propiedades de documento de identidad
        public string? DocumentoNombre { get; set; }
        public string? DocumentoAbreviatura { get; set; }
        public string? DocumentoPais { get; set; }
        public int? DocumentoLongitud { get; set; }
        public bool? DocumentoSoloNumeros { get; set; }
    }
}
