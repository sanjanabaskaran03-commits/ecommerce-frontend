"use client";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import LayoutContainer from "@/src/app/components/common/LayoutContainer";
import { useCart } from "@/src/app/context/CartContext";

const CartItem = () => {
  const router = useRouter();
  const theme = useTheme();
  const { cartItems, loading, removeFromCart, updateQuantity, toggleSaveForLater } =
    useCart();
  const [pendingQty, setPendingQty] = useState({});
  const [pendingSave, setPendingSave] = useState({});

  const getId = (item) => item?._id || item?.id;

  const safeItems = useMemo(
    () => (Array.isArray(cartItems) ? cartItems : []),
    [cartItems]
  );

  const subtotal = useMemo(() => {
    return safeItems.reduce((acc, item) => {
      return acc + (Number(item?.price) || 0) * (Number(item?.qty) || 1);
    }, 0);
  }, [safeItems]);

  const discount = useMemo(() => {
    return safeItems.reduce((acc, item) => {
      const unitPrice = Number(item?.price) || 0;
      const qty = Number(item?.qty) || 1;
      const percent = Math.max(0, Number(item?.discountPercent) || 0);
      const unitDiscount = (unitPrice * percent) / 100;
      return acc + unitDiscount * qty;
    }, 0);
  }, [safeItems]);

  const discountBreakdown = useMemo(() => {
    return safeItems
      .map((item) => {
        const unitPrice = Number(item?.price) || 0;
        const qty = Number(item?.qty) || 1;
        const percent = Math.max(0, Number(item?.discountPercent) || 0);
        const amount = (unitPrice * percent * qty) / 100;
        return {
          id: getId(item),
          title: item?.title || "Item",
          qty,
          percent,
          amount,
        };
      })
      .filter((row) => row.amount > 0.005);
  }, [safeItems]);

  const total = Math.max(0, subtotal - discount);

  const handleQtyChange = async (id, qty) => {
    setPendingQty((prev) => ({ ...prev, [id]: qty }));
    try {
      await updateQuantity(id, qty);
    } finally {
      setPendingQty((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const handleRemove = async (id) => {
    await removeFromCart(id);
  };

  const handleSaveForLater = async (id) => {
    setPendingSave((prev) => ({ ...prev, [id]: true }));
    try {
      await toggleSaveForLater(id);
    } finally {
      setPendingSave((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  return (
    <LayoutContainer>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, mt: 4,color:"text.primary" }}>
        My cart ({safeItems.length})
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {/* LEFT SIDE */}
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 3,
              borderRadius: "8px",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            {loading ? (
              <Typography sx={{ textAlign: "center", py: 5 }}>
                Loading cart...
              </Typography>
            ) : safeItems.length === 0 ? (
              <Typography sx={{ textAlign: "center", py: 5 }}>
                Your cart is empty.
              </Typography>
            ) : (
              safeItems.map((item, index) => {
                const id = getId(item);
                const itemQty = pendingQty[id] ?? item?.qty ?? 1;
                const unitPrice = Number(item?.price) || 0;
                const itemPercent = Math.max(
                  0,
                  Number(item?.discountPercent) || 0
                );
                const itemDiscount = (unitPrice * itemPercent * itemQty) / 100;

                return (
                  <Box key={id} sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      {/* IMAGE */}
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          position: "relative",
                          borderRadius: "6px",
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src={item?.img || "/images/sample.jpg"}
                          alt={item?.title || "Product"}
                          fill
                          style={{ objectFit: "contain", padding: 5 }}
                        />
                      </Box>

                      {/* DETAILS */}
                      {/* DETAILS */}
                      <Box sx={{ flexGrow: 1 }}>
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr auto",
                            rowGap: 0.5,
                            alignItems: "start",
                          }}
                        >
                          {/* TITLE */}
                          <Typography sx={{ fontWeight: 600, color: "text.primary" }}>
                            {item?.title}
                          </Typography>

                          {/* PRICE */}
                          <Typography
                            sx={{
                              fontWeight: 700,
                              color: "text.primary",
                              textAlign: "right",
                            }}
                          >
                            ${unitPrice.toFixed(2)}
                          </Typography>

                          {/* SELLER (LEFT) */}
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            Seller: Admin Store
                          </Typography>

                          {/* SAVE AMOUNT (RIGHT) */}
                          <Box sx={{ textAlign: "right" }}>
                            {itemDiscount > 0.005 && (
                              <Typography
                                variant="body2"
                                sx={{ color: "success.main" }}
                              >
                                Save ${itemDiscount.toFixed(2)}
                              </Typography>
                            )}
                          </Box>

                          {/* BUTTONS (LEFT) */}
                          <Box>
                            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                              <Button
                                size="small"
                                onClick={() => handleRemove(id)}
                                sx={{
                                  color: "#FF4D4C",
                                  textTransform: "none",
                                  border: "1px solid",
                                  borderColor: "divider",
                                }}
                              >
                                Remove
                              </Button>

                              <Button
                                size="small"
                                onClick={() => handleSaveForLater(id)}
                                disabled={Boolean(pendingSave[id])}
                                sx={{
                                  color: "#0D6EFD",
                                  textTransform: "none",
                                  border: "1px solid",
                                  borderColor: "divider",
                                }}
                              >
                                {pendingSave[id] ? "Saved" : "Save for later"}
                              </Button>
                            </Stack>
                          </Box>

                          {/* QTY (RIGHT) */}
                          <Box sx={{ textAlign: "right" }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: "6px",
                                width: "fit-content",
                                ml: "auto",
                              }}
                            >
                              <Button
                                size="small"
                                onClick={() =>
                                  itemQty > 1 && handleQtyChange(id, itemQty - 1)
                                }
                                sx={{ minWidth: 32, color: "text.secondary" }}
                              >
                                -
                              </Button>

                              <Typography
                                sx={{
                                  px: 1,
                                  minWidth: 20,
                                  textAlign: "center",
                                  color: "text.primary",
                                }}
                              >
                                {itemQty}
                              </Typography>

                              <Button
                                size="small"
                                onClick={() =>
                                  handleQtyChange(id, itemQty + 1)
                                }
                                sx={{ minWidth: 32, color: "text.secondary" }}
                              >
                                +
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    {index !== safeItems.length - 1 && (
                      <Divider sx={{ mt: 2 }} />
                    )}
                  </Box>
                );
              })
            )}
          </Box>
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ width: { xs: "100%", md: "300px" } }}>
          <Box
            sx={{
              p: 2,
              bgcolor: "background.paper",
              borderRadius: "8px",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Stack spacing={1.5}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ color: "text.secondary" }}>Subtotal:</Typography>
                <Typography sx={{ color: "text.primary" }}>${subtotal.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ color: "text.secondary" }}>Discount:</Typography>
                <Typography sx={{ color: "red" }}>
                  - ${discount.toFixed(2)}
                </Typography>
              </Box>
              {discountBreakdown.length > 0 && (
                <Box sx={{ mt: -0.5 }}>
                  {discountBreakdown.map((row) => (
                    <Box
                      key={row.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: 190,
                        }}
                        title={row.title}
                      >
                        {row.title} ({row.percent}% × {row.qty})
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        -${row.amount.toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              <Divider />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 700, color: "text.primary" }}>Total:</Typography>
                <Typography sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{ bgcolor: "#00B517" }}
                onClick={() => router.push("/checkout")}
              >
                Checkout
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </LayoutContainer>
  );
};

export default CartItem;
