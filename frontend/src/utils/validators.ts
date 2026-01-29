import type { DocumentoIdentidad } from "@/types/documento.types";

export const validateDocumento = (
  numeroDocumento: string,
  documento: DocumentoIdentidad | undefined
): { isValid: boolean; error?: string } => {
  if (!documento) {
    return { isValid: false, error: 'Selecciona un tipo de documento' };
  }

  if (!numeroDocumento) {
    return { isValid: false, error: 'El número de documento es requerido' };
  }

  if (numeroDocumento.length !== documento.longitud) {
    return {
      isValid: false,
      error: `El ${documento.abreviatura} debe tener exactamente ${documento.longitud} caracteres`,
    };
  }

  if (documento.soloNumeros) {
    const onlyNumbers = /^\d+$/;
    if (!onlyNumbers.test(numeroDocumento)) {
      return {
        isValid: false,
        error: `El ${documento.abreviatura} debe contener solo números`,
      };
    }
  }

  return { isValid: true };
};

export const validateEdad = (fechaNacimiento: string): { isValid: boolean; error?: string } => {
  const fecha = new Date(fechaNacimiento);
  const hoy = new Date();
  const edad = hoy.getFullYear() - fecha.getFullYear();

  if (edad < 0) {
    return { isValid: false, error: 'La fecha de nacimiento no puede ser futura' };
  }

  if (edad > 120) {
    return { isValid: false, error: 'La fecha de nacimiento no es válida' };
  }

  return { isValid: true };
};