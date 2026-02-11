import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // petición para mostrar todos los productos
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", 1);

    if (error) throw error;

    // la respuesta en formato JSON
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los productos" },
      { status: 500 },
    );
  }
}
