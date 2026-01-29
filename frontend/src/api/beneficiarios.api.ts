import type { Beneficiario, BeneficiarioDto } from "@/types/beneficiario.types";
import { apiClient } from "./axios.config";
import type { ApiResponse } from "@/types/api.types";

export const beneficiariosApi = {
  getAll: async () => {
    const response = await apiClient.get<ApiResponse<Beneficiario[]>>(
      '/Beneficiarios'
    );
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<ApiResponse<Beneficiario>>(
      `/Beneficiarios/${id}`
    );
    return response.data;
  },

  create: async (data: BeneficiarioDto) => {
    const response = await apiClient.post<ApiResponse<Beneficiario>>(
      '/Beneficiarios',
      data
    );
    return response.data;
  },

  update: async (id: number, data: BeneficiarioDto) => {
    const response = await apiClient.put<ApiResponse<Beneficiario>>(
      `/Beneficiarios/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<{ id: number }>>(
      `/Beneficiarios/${id}`
    );
    return response.data;
  },
};