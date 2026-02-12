import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "No autrizado. Sin token." },
        { status: 401 },
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Token inválido o expirado" },
        { status: 401 },
      );
    }

    const realClientId = user.id;

    const body = await request.json();
    const { product_id, quantity } = body;

    if (!product_id || !quantity) {
      return NextResponse.json(
        { error: "Faltan datos de la compra" },
        { status: 400 },
      );
    }

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("price, stock")
      .eq("id", product_id)
      .single(); // solo se espera un resultado

    if (productError || !product) throw new Error("Producto no encontrado");

    if (product.stock < quantity) {
      return NextResponse.json(
        { error: "No hay suficiente stock para esta compra" },
        { status: 400 },
      );
    }

    const total_price = product.price * quantity;

    const { error: insertError } = await supabase.from("sales").insert([
      {
        product_id: product_id,
        quantity: quantity,
        total_price: total_price,
        client_id: realClientId,
      },
    ]);

    if (insertError) throw insertError;

    const newStock = product.stock - quantity;

    const { error: updateError } = await supabase
      .from("products")
      .update({ stock: newStock })
      .eq("id", product_id);

    if (updateError) throw updateError;

    return NextResponse.json({ message: "Compra realizada con éxito" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al procesar la compra";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
