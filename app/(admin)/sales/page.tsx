import { supabase } from "@/lib/supabase";
import { SalesTable } from "@/components/sales-table";

export default async function SalesPage() {
  const { data: sales, error } = await supabase
    .from("sales")
    .select(`*, products (name, brand, img_url), profiles (email)`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error cargando productos:", error);
  }

  return (
    <div className="flex flex-col w-full p-6">
      <div className="flex items-center mb-5">
        <h1 className="text-3xl font-bold">Ventas</h1>
      </div>
      <SalesTable sales={sales || []} />
    </div>
  );
}
