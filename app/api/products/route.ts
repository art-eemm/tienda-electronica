import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");

    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Token no proporcionado" },
        { status: 401 },
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Token inválido o expirado. Acceso negado" },
        { status: 401 },
      );
    }

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
