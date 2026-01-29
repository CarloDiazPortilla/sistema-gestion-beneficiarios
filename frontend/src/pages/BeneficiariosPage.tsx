import { BeneficiarioModal } from "@/components/BeneficiarioModal"
import { BeneficiarioTable } from "@/components/BeneficiarioTable"
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useBeneficiarios } from "@/hooks/useBeneficiarios"
import type { Beneficiario } from "@/types/beneficiario.types"
import type { BeneficiarioFormData } from "@/types/form.types"
import { Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const BeneficiariosPage = () => {

  const {
    beneficiarios,
    isLoading,
    fetchBeneficiarios,
    createBeneficiario,
    updateBeneficiarioById,
    deleteBeneficiarioById,
  } = useBeneficiarios();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBeneficiario, setSelectedBeneficiario] = useState<Beneficiario | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBeneficiarios();
  }, []);

  const filteredBeneficiarios = beneficiarios.filter((b) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      b.nombres.toLowerCase().includes(searchLower) ||
      b.apellidos.toLowerCase().includes(searchLower) ||
      b.numeroDocumento.includes(searchTerm)
    );
  });

  const handleCreate = () => {
    setSelectedBeneficiario(null);
    setIsModalOpen(true);
  };

  const handleEdit = (beneficiario: Beneficiario) => {
    setSelectedBeneficiario(beneficiario);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (beneficiario: Beneficiario) => {
    setSelectedBeneficiario(beneficiario);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (data: BeneficiarioFormData) => {
    setIsSubmitting(true);

    const payload = {
      nombres: data.nombres,
      apellidos: data.apellidos,
      documentoIdentidadId: Number(data.documentoIdentidadId),
      numeroDocumento: data.numeroDocumento,
      fechaNacimiento: data.fechaNacimiento,
      sexo: data.sexo as 'M' | 'F',
    };

    let result;
    if (selectedBeneficiario) {
      // Actualizar
      result = await updateBeneficiarioById(selectedBeneficiario.id, payload);
    } else {
      // Crear
      result = await createBeneficiario(payload);
    }

    if (result?.success) {
      toast('Éxito', {
        description: selectedBeneficiario ? "Se actualizó la información correctamente" : "Se creó el beneficiario correctamente"
      });
      setIsModalOpen(false);
      setSelectedBeneficiario(null);
    } else {
      toast('Error', {
        description: result?.error || "Hubo un error al crear el beneficiario"
      })
    }

    setIsSubmitting(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBeneficiario) return;

    setIsSubmitting(true);
    const result = await deleteBeneficiarioById(selectedBeneficiario.id);

    if (result?.success) {
      toast('Éxito', {
        description: "Se eliminó correctamente el beneficiario"
      });
      setIsDeleteModalOpen(false);
      setSelectedBeneficiario(null);
    } else {
      toast('Error', {
        description: result?.error || "Hubo un error al eliminar el beneficiario"
      })
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Beneficiarios</h1>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Beneficiario
            </Button>
          </div>

          <Card>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, apellido o documento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>


              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent >
              <BeneficiarioTable
                beneficiarios={filteredBeneficiarios}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>

          <BeneficiarioModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedBeneficiario(null);
            }}
            beneficiario={selectedBeneficiario || undefined}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />

          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            beneficiario={selectedBeneficiario}
            onConfirm={handleConfirmDelete}
            onCancel={() => {
              setIsDeleteModalOpen(false);
              setSelectedBeneficiario(null);
            }}
            isLoading={isSubmitting}
          />
        </div>
      </main>
    </div>
  )
}
