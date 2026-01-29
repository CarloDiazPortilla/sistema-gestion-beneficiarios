import type { Beneficiario } from '@/types/beneficiario.types';
import { create } from 'zustand';

interface BeneficiariosState {
  beneficiarios: Beneficiario[];
  selectedBeneficiario: Beneficiario | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setBeneficiarios: (beneficiarios: Beneficiario[]) => void;
  setSelectedBeneficiario: (beneficiario: Beneficiario | null) => void;
  addBeneficiario: (beneficiario: Beneficiario) => void;
  updateBeneficiario: (id: number, beneficiario: Beneficiario) => void;
  deleteBeneficiario: (id: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useBeneficiariosStore = create<BeneficiariosState>((set) => ({
  beneficiarios: [],
  selectedBeneficiario: null,
  isLoading: false,
  error: null,

  setBeneficiarios: (beneficiarios) => set({ beneficiarios }),

  setSelectedBeneficiario: (beneficiario) =>
    set({ selectedBeneficiario: beneficiario }),

  addBeneficiario: (beneficiario) =>
    set((state) => ({
      beneficiarios: [...state.beneficiarios, beneficiario],
    })),

  updateBeneficiario: (id, beneficiario) =>
    set((state) => ({
      beneficiarios: state.beneficiarios.map((b) =>
        b.id === id ? beneficiario : b
      ),
    })),

  deleteBeneficiario: (id) =>
    set((state) => ({
      beneficiarios: state.beneficiarios.filter((b) => b.id !== id),
    })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),
}));