"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Product } from "@/types";

interface ProductDialogProps {
  product?: Product;
}

export function ProductDialog({ product }: ProductDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: product?.name || "",
    brand: product?.brand || "",
    price: product?.price.toString() || "",
    stock: product?.stock.toString() || "",
    storage: product?.storage.toString() || "",
    img_url: product?.img_url || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let error;

      if (product?.id) {
        const result = await supabase
          .from("products")
          .update({
            name: formData.name,
            brand: formData.brand,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            storage: parseInt(formData.storage),
            img_url: formData.img_url,
          })
          .eq("id", product.id);

        error = result.error;
      } else {
        const result = await supabase.from("products").insert([
          {
            name: formData.name,
            brand: formData.brand,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            storage: parseInt(formData.storage),
            img_url: formData.img_url,
          },
        ]);

        error = result.error;
      }

      if (error) throw error;

      setFormData({
        name: "",
        brand: "",
        price: "",
        stock: "",
        storage: "",
        img_url: "",
      }); // Limpia de form
      setOpen(false); // cierre de modal
      router.refresh();
    } catch (error) {
      console.error("Error al crear producto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{product ? "Actualizar" : "+ Nuevo producto"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {product ? "Actualizar producto" : "Crear producto"}
          </DialogTitle>
          <DialogDescription>
            {product
              ? "Edita los campos necesarios"
              : "Añade un nuevo articulo al inventario"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="text-right">
              Marca
            </Label>
            <Input
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Precio
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              step={0.01}
              value={formData.price}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="storage" className="text-right">
              GB
            </Label>
            <Input
              id="storage"
              name="storage"
              type="number"
              placeholder="128"
              value={formData.storage}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="img_url" className="text-right">
              URL img
            </Label>
            <Input
              id="img_url"
              name="img_url"
              value={formData.img_url}
              onChange={handleChange}
              className="col-span-3"
              placeholder="https://..."
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
