"use client"; // se usa porque es necesario interactuar con el usuario

import { useState } from "react";
import { useRouter } from "next/navigation"; // redirigir
import { supabase } from "@/lib/supabase"; // cliente
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // llamada a supabase para iniciar sesión
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/products");
        router.refresh();
      }
    } catch (err) {
      setError(`Ocurrió un error inesperado ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para ingresar
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Correo</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@gmail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="*****"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full mt-5" type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
