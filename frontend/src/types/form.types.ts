export interface BeneficiarioFormData {
  nombres: string;
  apellidos: string;
  documentoIdentidadId: string;
  numeroDocumento: string;
  fechaNacimiento: string;
  sexo: 'M' | 'F' | '';
}