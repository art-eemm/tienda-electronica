import { supabase } from "@/lib/supabase";
import { ProductTable } from "@/components/product-table";
import { ProductDialog } from "@/components/product-dialog";

export default async function DashboardPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("status", 1);

  if (error) {
    console.error("Error cargando productos:", error);
  }

  return (
    <div className="flex flex-col w-full p-6">
      <div className="flex items-center mb-5">
        <h1 className="text-3xl font-bold">Productos</h1>
        <div className="ml-auto">
          <ProductDialog />
        </div>
      </div>
      <ProductTable products={products || []} />
    </div>
  );
}
