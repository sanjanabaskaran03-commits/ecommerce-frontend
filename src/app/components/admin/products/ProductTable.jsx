"use client";

import {
  Table, TableBody, TableCell, TableHead, TableRow, Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function ProductTable() {
  const router = useRouter();

  const products = [
    { id: 1, name: "Laptop", price: 500 },
    { id: 2, name: "Phone", price: 300 },
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.name}</TableCell>
            <TableCell>${p.price}</TableCell>
            <TableCell>
              <Button onClick={() => router.push(`/admin/edit-product/${p.id}`)}>
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}