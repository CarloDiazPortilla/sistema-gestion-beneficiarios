import type { ApiResponse } from "@/types/api.types";
import { apiClient } from "./axios.config";
import type { DocumentoIdentidad } from "@/types/documento.types";

export const documentosApi = {
  getActivos: async () => {
    const response = await apiClient.get<ApiResponse<DocumentoIdentidad[]>>(
      '/DocumentosIdentidad/activos'
    );
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get<ApiResponse<DocumentoIdentidad[]>>(
      '/DocumentosIdentidad'
    );
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<ApiResponse<DocumentoIdentidad>>(
      `/DocumentosIdentidad/${id}`
    );
    return response.data;
  },
};