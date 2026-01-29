import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (dateString: string, formatStr: string = 'dd/MM/yyyy'): string => {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr, { locale: es });
  } catch {
    return dateString;
  }
};

export const formatSexo = (sexo: 'M' | 'F'): string => {
  return sexo === 'M' ? 'Masculino' : 'Femenino';
};