"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductTable() {
  const router = useRouter();

  const [products, setProducts] = useState([]);

  // FETCH PRODUCTS
  useEffect(() => {
    fetch("http://localhost:5000/api/products?mode=admin")
      .then((res) => res.json())
      .then((data) => setProducts(data || []))
      .catch((err) => console.log(err));
  }, []);

  // DELETE PRODUCT
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Image</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {products.map((p) => (
          <TableRow key={p._id}>

            {/* IMAGE FIX */}
            <TableCell>
              <img
               src={p.image?.startsWith("data:image") ? p.image : "/images/sample.jpg"}
                alt={p.title}
                width={50}
                height={50}
                style={{ borderRadius: "6px", objectFit: "cover" }}
              />
            </TableCell>

            {/* NAME */}
            <TableCell>{p.title}</TableCell>

            {/* PRICE */}
            <TableCell>${p.price}</TableCell>

            {/* ACTIONS */}
            <TableCell>
              <div style={{ display: "flex", gap: "10px" }}>

                {/* EDIT */}
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    router.push(`/admin/edit-product/${p._id}`)
                  }
                >
                  Edit
                </Button>

                {/* DELETE */}
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </Button>

              </div>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}