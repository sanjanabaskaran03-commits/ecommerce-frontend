"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Divider,
} from "@mui/material";
import LayoutContainer from "@/src/app/components/common/LayoutContainer";
import { useCart } from "@/src/app/context/CartContext";
import Image from "next/image";

const API = process.env.NEXT_PUBLIC_API_URL;

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(true);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    house: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ================= FETCH ADDRESS =================
  useEffect(() => {
    const fetchAddress = async () => {
      const res = await fetch(`${API}/api/address`, {
        credentials: "include",
      });
      const data = await res.json();

      if (data && data.name) {
        setAddress(data);
        setIsEditing(false);
      }
    };

    fetchAddress();
  }, []);

  // ================= SAVE ADDRESS =================
  const handleSave = async () => {
    await fetch(`${API}/api/address`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    });

    setIsEditing(false);
  };

  // ================= SAFE CART =================
  const safeItems = useMemo(() => {
    return Array.isArray(cartItems) ? cartItems : [];
  }, [cartItems]);

  // ================= TOTAL CALC =================
  const subtotal = useMemo(() => {
    return safeItems.reduce((acc, item) => {
      return acc + (Number(item.price) || 0) * (Number(item.qty) || 1);
    }, 0);
  }, [safeItems]);

  const discount = useMemo(() => {
    return safeItems.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.qty) || 1;
      const percent = Math.max(0, Number(item.discountPercent) || 0);
      return acc + (price * percent * qty) / 100;
    }, 0);
  }, [safeItems]);

  const total = Math.max(0, subtotal - discount);

  // ================= CHECKOUT =================
  const handleCheckout = async () => {
    try {
      const res = await fetch(`${API}/api/order/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      router.push(`/payment?orderId=${data.orderId}`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // ================= INPUT FIELD UI =================
  const Field = ({ label, placeholder, value, onChange }) => (
    <Box>
      <Typography fontWeight={500} mb={0.5} sx={{color:"text.primary",fontWeight:"bold"}}>
        {label}
      </Typography>
      <TextField
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        fullWidth
      />
    </Box>
  );

  return (
    <LayoutContainer>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mt:5,
          width:"100%",
          flexDirection: { xs: "column", md: "row" },
          
        }}
      >
        {/* ================= LEFT ================= */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Box
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            {isEditing ? (
              <>
                <Typography  sx={{mb:5,textAlign:"center",color:"text.primary",fontWeight:"bold",fontSize:"22px"}}>
                  Shipping Information
                </Typography>

                <Stack spacing={2}>
                  {/* ROW 1 */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 2,
                    }}
                  >
                    <Field
                      label="Full Name"
                      placeholder="e.g. John Doe"
                      value={address.name}
                      onChange={(e) =>
                        setAddress({ ...address, name: e.target.value })
                      }
                    />

                    <Field
                      label="Mobile Number"
                      placeholder="e.g. 9876543210"
                      value={address.phone}
                      onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                      }
                    />
                  </Box>

                  {/* ROW 2 */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 2,
                    }}
                  >
                    <Field
                      label="House / Door No"
                      placeholder="e.g. 12B, Gandhi Street"
                      value={address.house}
                      onChange={(e) =>
                        setAddress({ ...address, house: e.target.value })
                      }
                    />

                    <Field
                      label="Area"
                      placeholder="e.g. Anna Nagar"
                      value={address.area}
                      onChange={(e) =>
                        setAddress({ ...address, area: e.target.value })
                      }
                    />
                  </Box>

                  {/* ROW 3 */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr 1fr",
                      },
                      gap: 2,
                    }}
                  >
                    <Field
                      label="City"
                      placeholder="e.g. Chennai"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                    />

                    <Field
                      label="State"
                      placeholder="e.g. Tamil Nadu"
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                    />

                    <Field
                      label="Pincode"
                      placeholder="e.g. 600001"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({ ...address, pincode: e.target.value })
                      }
                    />
                  </Box>

                  <Button variant="contained" onClick={handleSave}>
                    Save & Continue
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <Typography  sx={{mb:5,textAlign:"center",color:"text.primary",fontWeight:"bold",fontSize:"22px"}}>
                  Shipping Address
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>

  <Box sx={{ display: "flex", gap: 1 }}>
    <Typography fontWeight={600} sx={{ minWidth: 120,color:"text.primary" }}>
      Name:
    </Typography>
    <Typography sx={{color:"text.secondary"}}>{address.name}</Typography>
  </Box>

  <Box sx={{ display: "flex", gap: 1 }}>
    <Typography fontWeight={600} sx={{ minWidth: 120,color:"text.primary" }}>
      Mobile No:
    </Typography>
    <Typography sx={{color:"text.secondary"}}>{address.phone}</Typography>
  </Box>

  <Box sx={{ display: "flex", gap: 1 }}>
    <Typography fontWeight={600} sx={{ minWidth: 120,color:"text.primary" }}>
      Address:
    </Typography>
    <Typography sx={{color:"text.secondary"}}>
      {address.house}, {address.area}
    </Typography>
  </Box>

  <Box sx={{ display: "flex", gap: 1 }}>
    <Typography fontWeight={600} sx={{ minWidth: 120,color:"text.primary" }}>
      City:
    </Typography>
    <Typography sx={{color:"text.secondary"}}>{address.city}</Typography>
  </Box>

  <Box sx={{ display: "flex", gap: 1 }}>
    <Typography fontWeight={600} sx={{ minWidth: 120,color:"text.primary" }}>
      State:
    </Typography>
    <Typography sx={{color:"text.secondary"}}>{address.state}</Typography>
  </Box>

  <Box sx={{ display: "flex", gap: 1 }}>
    <Typography fontWeight={600} sx={{ minWidth: 120,color:"text.primary" }}>
      Pincode:
    </Typography>
    <Typography sx={{color:"text.secondary"}}>{address.pincode}</Typography>
  </Box>

  <Button
    variant="outlined"
    sx={{ mt: 2, alignSelf: "flex-start" }}
    onClick={() => setIsEditing(true)}
  >
    Edit
  </Button>

</Box>
              </>
            )}
          </Box>
        </Box>

        {/* ================= RIGHT ================= */}
        <Box
  sx={{
    flex: { xs: "unset", md: "0 0 350px" },
    flexShrink: 0, // ✅ fixed
  }}
>
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            <Typography fontWeight={600} sx={{color:"text.primary",mb:2,fontWeight:"bold"}}>
              Review your cart
            </Typography>

            {safeItems.map((item) => (
              <Box key={item._id} sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    position: "relative",
                    borderRadius: 1,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Image
                    src={item.img || "/images/sample.jpg"}
                    alt={item.title}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>

                <Box flex={1}>
                  <Typography fontSize={14} fontWeight={500} sx={{color:"text.primary"}}>
                    {item.title}
                  </Typography>

                  <Typography fontSize={13} sx={{color:"text.secondary"}}>
                    Qty: {item.qty || 1}
                  </Typography>

                  <Typography fontWeight={600} sx={{color:"text.secondary"}}>
                    ${item.price}
                  </Typography>
                </Box>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{color:"text.primary"}}>Subtotal</Typography>
              <Typography sx={{color:"text.secondary"}}>${subtotal.toFixed(2)}</Typography>
            </Box>

            {discount > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{color:"text.primary"}}>Discount</Typography>
                <Typography sx={{color:"green"}}>
                  -${discount.toFixed(2)}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 1 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontWeight={600} sx={{color:"text.primary"}}>Total</Typography>
              <Typography fontWeight={600} sx={{color:"text.secondary"}}>
                ${total.toFixed(2)}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleCheckout}
            >
              Continue to Payment
            </Button>
          </Box>
        </Box>
      </Box>
    </LayoutContainer>
  );
};

export default CheckoutPage;