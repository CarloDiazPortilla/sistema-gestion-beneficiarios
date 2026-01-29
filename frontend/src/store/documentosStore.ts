import type { DocumentoIdentidad } from '@/types/documento.types';
import { create } from 'zustand';

interface DocumentosState {
  documentos: DocumentoIdentidad[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setDocumentos: (documentos: DocumentoIdentidad[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  getDocumentoById: (id: number) => DocumentoIdentidad | undefined;
}

export const useDocumentosStore = create<DocumentosState>((set, get) => ({
  documentos: [],
  isLoading: false,
  error: null,

  setDocumentos: (documentos) => set({ documentos }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  getDocumentoById: (id) => {
    const { documentos } = get();
    return documentos.find((doc) => doc.id === id);
  },
}));