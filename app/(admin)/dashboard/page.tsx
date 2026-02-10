import { supabase } from "@/lib/supabase";
import { ProductTable } from "@/components/product-table";

export default async function DashboardPage() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error cargando productos:", error);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-4">
        Bienvenido al panel de administración de productos.
      </p>
      <ProductTable products={products || []} />
    </div>
  );
}
