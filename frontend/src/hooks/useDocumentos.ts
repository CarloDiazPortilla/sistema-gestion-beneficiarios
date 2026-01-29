import { documentosApi } from "@/api/documentos.api";
import { useDocumentosStore } from "@/store/documentosStore";

export const useDocumentos = () => {
  const {
    documentos,
    isLoading,
    error,
    setDocumentos,
    setLoading,
    setError,
    getDocumentoById,
  } = useDocumentosStore();

  const fetchDocumentosActivos = async () => {
    try {
      setLoading(true);
      const response = await documentosApi.getActivos();
      if (response.success) {
        setDocumentos(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar documentos');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDocumentos = async () => {
    try {
      setLoading(true);
      const response = await documentosApi.getAll();
      if (response.success) {
        setDocumentos(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar documentos');
    } finally {
      setLoading(false);
    }
  };

  return {
    documentos,
    isLoading,
    error,
    fetchDocumentosActivos,
    fetchAllDocumentos,
    getDocumentoById,
  };
};