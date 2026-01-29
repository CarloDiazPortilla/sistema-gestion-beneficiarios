import type { Beneficiario } from "@/types/beneficiario.types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import type { BeneficiarioFormData } from "@/types/form.types";

interface BeneficiarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  beneficiario?: Beneficiario;
  onSubmit: (data: BeneficiarioFormData) => void;
  isLoading?: boolean;
}

export const BeneficiarioModal = ({
  isOpen,
  onClose,
  onSubmit,
  beneficiario,
  isLoading = false
}: BeneficiarioModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {beneficiario ? 'Editar Beneficiario' : 'Crear Nuevo Beneficiario'}
          </DialogTitle>
          <DialogDescription>
            {beneficiario
              ? 'Actualiza la información del beneficiario'
              : 'Completa el formulario para registrar un nuevo beneficiario'}
          </DialogDescription>
        </DialogHeader>

        {/* Formulario para beneficiario */}
      </DialogContent>
    </Dialog>
  );
}
