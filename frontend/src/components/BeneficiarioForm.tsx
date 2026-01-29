import type { Beneficiario } from "@/types/beneficiario.types";
import type { BeneficiarioFormData } from "@/types/form.types";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect } from "react";
import { useDocumentos } from "@/hooks/useDocumentos";
import { useForm } from "react-hook-form"
import { validateDocumento, validateEdad } from "@/utils/validators";

interface BeneficiarioFormProps {
  beneficiario?: Beneficiario;
  onSubmit: (data: BeneficiarioFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const SEXO_OPTIONS = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
] as const;

export const BeneficiarioForm = ({
  onCancel,
  onSubmit,
  beneficiario,
  isLoading = false
}: BeneficiarioFormProps) => {
  const { documentos, fetchDocumentosActivos, getDocumentoById } = useDocumentos();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<BeneficiarioFormData>({
    defaultValues: beneficiario
      ? {
        nombres: beneficiario.nombres,
        apellidos: beneficiario.apellidos,
        documentoIdentidadId: beneficiario.documentoIdentidadId.toString(),
        numeroDocumento: beneficiario.numeroDocumento,
        fechaNacimiento: beneficiario.fechaNacimiento.split('T')[0],
        sexo: beneficiario.sexo,
      }
      : {
        nombres: '',
        apellidos: '',
        documentoIdentidadId: '',
        numeroDocumento: '',
        fechaNacimiento: '',
        sexo: '',
      },
  });

  const documentoIdSelected = watch('documentoIdentidadId');
  const numeroDocumento = watch('numeroDocumento');
  const fechaNacimiento = watch('fechaNacimiento');

  useEffect(() => {
    fetchDocumentosActivos();
  }, []);

  useEffect(() => {
    if (documentoIdSelected && numeroDocumento) {
      const documento = getDocumentoById(Number(documentoIdSelected));
      const validation = validateDocumento(numeroDocumento, documento);

      if (!validation.isValid && validation.error) {
        setError('numeroDocumento', { message: validation.error });
      } else {
        clearErrors('numeroDocumento');
      }
    }
  }, [documentoIdSelected, numeroDocumento]);

  useEffect(() => {
    if (fechaNacimiento) {
      const validation = validateEdad(fechaNacimiento);

      if (!validation.isValid && validation.error) {
        setError('fechaNacimiento', { message: validation.error });
      } else {
        clearErrors('fechaNacimiento');
      }
    }
  }, [fechaNacimiento]);

  const handleFormSubmit = (data: BeneficiarioFormData) => {
    const documento = getDocumentoById(Number(data.documentoIdentidadId));
    const docValidation = validateDocumento(data.numeroDocumento, documento);

    if (!docValidation.isValid) {
      setError('numeroDocumento', { message: docValidation.error });
      return;
    }

    const edadValidation = validateEdad(data.fechaNacimiento);
    if (!edadValidation.isValid) {
      setError('fechaNacimiento', { message: edadValidation.error });
      return;
    }

    onSubmit(data);
  };

  const selectedDocumento = documentoIdSelected
    ? getDocumentoById(Number(documentoIdSelected))
    : null;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Nombres */}
      <div className="space-y-2">
        <Label htmlFor="nombres">
          Nombres <span className="text-red-500">*</span>
        </Label>
        <Input
          id="nombres"
          {...register('nombres', {
            required: 'Los nombres son requeridos',
            maxLength: { value: 100, message: 'Máximo 100 caracteres' },
          })}
          placeholder="Ej: Juan Carlos"
          disabled={isLoading}
        />
        {errors.nombres && (
          <p className="text-sm text-red-500">{errors.nombres.message}</p>
        )}
      </div>

      {/* Apellidos */}
      <div className="space-y-2">
        <Label htmlFor="apellidos">
          Apellidos <span className="text-red-500">*</span>
        </Label>
        <Input
          id="apellidos"
          {...register('apellidos', {
            required: 'Los apellidos son requeridos',
            maxLength: { value: 100, message: 'Máximo 100 caracteres' },
          })}
          placeholder="Ej: Pérez García"
          disabled={isLoading}
        />
        {errors.apellidos && (
          <p className="text-sm text-red-500">{errors.apellidos.message}</p>
        )}
      </div>

      {/* Tipo de Documento */}
      <div className="space-y-2">
        <Label htmlFor="documentoIdentidadId">
          Tipo de Documento <span className="text-red-500">*</span>
        </Label>
        <Select
          value={documentoIdSelected}
          onValueChange={(value) => {
            setValue('documentoIdentidadId', value);
            setValue('numeroDocumento', ''); // Limpiar número al cambiar tipo
          }}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un tipo de documento" />
          </SelectTrigger>
          <SelectContent>
            {documentos.map((doc) => (
              <SelectItem key={doc.id} value={doc.id.toString()}>
                {doc.nombre} ({doc.abreviatura}) - {doc.pais}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.documentoIdentidadId && (
          <p className="text-sm text-red-500">
            {errors.documentoIdentidadId.message}
          </p>
        )}
      </div>

      {/* Número de Documento */}
      <div className="space-y-2">
        <Label htmlFor="numeroDocumento">
          Número de Documento <span className="text-red-500">*</span>
        </Label>
        <Input
          id="numeroDocumento"
          {...register('numeroDocumento', {
            required: 'El número de documento es requerido',
          })}
          placeholder={
            selectedDocumento
              ? `${selectedDocumento.longitud} ${selectedDocumento.soloNumeros ? 'dígitos' : 'caracteres'
              }`
              : 'Primero selecciona un tipo de documento'
          }
          disabled={isLoading || !documentoIdSelected}
          maxLength={selectedDocumento?.longitud || 20}
        />
        {selectedDocumento && (
          <p className="text-xs text-muted-foreground">
            Debe tener exactamente {selectedDocumento.longitud}{' '}
            {selectedDocumento.soloNumeros
              ? 'dígitos numéricos'
              : 'caracteres alfanuméricos'}
          </p>
        )}
        {errors.numeroDocumento && (
          <p className="text-sm text-red-500">
            {errors.numeroDocumento.message}
          </p>
        )}
      </div>

      {/* Fecha de Nacimiento */}
      <div className="space-y-2">
        <Label htmlFor="fechaNacimiento">
          Fecha de Nacimiento <span className="text-red-500">*</span>
        </Label>
        <Input
          id="fechaNacimiento"
          type="date"
          {...register('fechaNacimiento', {
            required: 'La fecha de nacimiento es requerida',
          })}
          disabled={isLoading}
        />
        {errors.fechaNacimiento && (
          <p className="text-sm text-red-500">
            {errors.fechaNacimiento.message}
          </p>
        )}
      </div>

      {/* Sexo */}
      <div className="space-y-2">
        <Label htmlFor="sexo">
          Sexo <span className="text-red-500">*</span>
        </Label>
        <Select
          value={watch('sexo')}
          onValueChange={(value) => setValue('sexo', value as 'M' | 'F')}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona el sexo" />
          </SelectTrigger>
          <SelectContent>
            {SEXO_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.sexo && (
          <p className="text-sm text-red-500">{errors.sexo.message}</p>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {beneficiario ? 'Actualizar' : 'Crear'} Beneficiario
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
