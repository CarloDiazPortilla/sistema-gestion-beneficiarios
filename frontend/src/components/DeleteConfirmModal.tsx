import type { Beneficiario } from "@/types/beneficiario.types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  beneficiario: Beneficiario | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DeleteConfirmModal = ({
  beneficiario,
  isOpen,
  onCancel,
  onConfirm,
  isLoading = false
}: DeleteConfirmModalProps) => {
  if (!beneficiario) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente el beneficiario:
            <div className="mt-4 p-4 bg-muted rounded-md">
              <p className="font-semibold">
                {beneficiario.apellidos}, {beneficiario.nombres}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {beneficiario.documentoAbreviatura}: {beneficiario.numeroDocumento}
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? 'Eliminando...' : 'Eliminar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
