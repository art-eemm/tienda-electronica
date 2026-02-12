import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { SaleWithProduct } from "@/types";

interface SaleTableProps {
  sales: SaleWithProduct[];
}

export function SalesTable({ sales }: SaleTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Imagen</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>
                <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-100">
                  {sale.products?.img_url ? (
                    <img
                      src={sale.products.img_url}
                      alt={sale.products.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                      No img
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {sale.products?.name || "Producto eliminado"}
              </TableCell>
              <TableCell>
                {sale.profiles?.email || "Usuario desconocido"}
              </TableCell>
              <TableCell>{sale.quantity}</TableCell>
              <TableCell>${sale.total_price.toFixed(2)}</TableCell>
              <TableCell>
                {new Date(sale.created_at).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
