import type { Beneficiario } from "@/types/beneficiario.types";
import { Button } from "./ui/button";
import { Edit, Loader2, Trash2 } from "lucide-react";
import { formatDate, formatSexo } from "@/utils/formatters";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface BeneficiarioTableProps {
  beneficiarios: Beneficiario[];
  onEdit: (beneficiario: Beneficiario) => void;
  onDelete: (beneficiario: Beneficiario) => void;
  isLoading?: boolean;
}

export const BeneficiarioTable = ({
  beneficiarios,
  onDelete,
  onEdit,
  isLoading
}: BeneficiarioTableProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (beneficiarios.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No hay beneficiarios registrados</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombres</TableHead>
            <TableHead>Apellidos</TableHead>
            <TableHead>Documento</TableHead>
            <TableHead>País</TableHead>
            <TableHead>F. Nacimiento</TableHead>
            <TableHead>Sexo</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {beneficiarios.map((beneficiario) => (
            <TableRow key={beneficiario.id}>
              <TableCell className="font-medium">
                {beneficiario.nombres}
              </TableCell>
              <TableCell>{beneficiario.apellidos}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{beneficiario.numeroDocumento}</div>
                  <div className="text-xs text-muted-foreground">
                    {beneficiario.documentoAbreviatura}
                  </div>
                </div>
              </TableCell>
              <TableCell>{beneficiario.documentoPais}</TableCell>
              <TableCell>{formatDate(beneficiario.fechaNacimiento)}</TableCell>
              <TableCell>{formatSexo(beneficiario.sexo)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onEdit(beneficiario)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onDelete(beneficiario)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
