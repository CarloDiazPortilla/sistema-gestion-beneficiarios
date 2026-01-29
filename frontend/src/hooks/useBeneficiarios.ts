import { beneficiariosApi } from "@/api/beneficiarios.api";
import { useBeneficiariosStore } from "@/store/beneficiariosStore";
import type { BeneficiarioDto } from "@/types/beneficiario.types";

export const useBeneficiarios = () => {
  const {
    beneficiarios,
    selectedBeneficiario,
    isLoading,
    error,
    setBeneficiarios,
    setSelectedBeneficiario,
    addBeneficiario,
    updateBeneficiario,
    deleteBeneficiario,
    setLoading,
    setError,
    clearError,
  } = useBeneficiariosStore();

  const fetchBeneficiarios = async () => {
    try {
      setLoading(true);
      clearError();
      const response = await beneficiariosApi.getAll();
      if (response.success) {
        setBeneficiarios(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar beneficiarios');
    } finally {
      setLoading(false);
    }
  };

  const fetchBeneficiarioById = async (id: number) => {
    try {
      setLoading(true);
      clearError();
      const response = await beneficiariosApi.getById(id);
      if (response.success) {
        setSelectedBeneficiario(response.data);
        return response.data;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar beneficiario');
    } finally {
      setLoading(false);
    }
  };

  const createBeneficiario = async (data: BeneficiarioDto) => {
    try {
      setLoading(true);
      clearError();
      const response = await beneficiariosApi.create(data);
      if (response.success) {
        addBeneficiario(response.data);
        return { success: true, data: response.data };
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al crear beneficiario';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateBeneficiarioById = async (
    id: number,
    data: BeneficiarioDto
  ) => {
    try {
      setLoading(true);
      clearError();
      const response = await beneficiariosApi.update(id, data);
      if (response.success) {
        updateBeneficiario(id, response.data);
        return { success: true, data: response.data };
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar beneficiario';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const deleteBeneficiarioById = async (id: number) => {
    try {
      setLoading(true);
      clearError();
      const response = await beneficiariosApi.delete(id);
      if (response.success) {
        deleteBeneficiario(id);
        return { success: true };
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al eliminar beneficiario';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    beneficiarios,
    selectedBeneficiario,
    isLoading,
    error,
    fetchBeneficiarios,
    fetchBeneficiarioById,
    createBeneficiario,
    updateBeneficiarioById,
    deleteBeneficiarioById,
    clearError,
    setSelectedBeneficiario,
  };
};