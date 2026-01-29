export interface Beneficiario {
  id: number;
  nombres: string;
  apellidos: string;
  documentoIdentidadId: number;
  numeroDocumento: string;
  fechaNacimiento: string;
  sexo: 'M' | 'F';
  fechaCreacion: string;
  fechaModificacion?: string;

  // Propiedades del documento
  documentoNombre?: string;
  documentoAbreviatura?: string;
  documentoPais?: string;
  documentoLongitud?: number;
  documentoSoloNumeros?: boolean;
}

export interface BeneficiarioDto {
  nombres: string;
  apellidos: string;
  documentoIdentidadId: number;
  numeroDocumento: string;
  fechaNacimiento: string;
  sexo: 'M' | 'F';
}