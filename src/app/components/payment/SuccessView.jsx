"use client";

import { Box, Typography, Button, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

const SuccessView = () => {
    const router = useRouter();
    const params = useSearchParams();

    const orderId = params.get("orderId");

    return (
        <Box
            sx={{
                minHeight: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
            }}
        >
            <Box
                sx={{
                    maxWidth: 500,
                    width: "100%",
                    textAlign: "center",
                    p: 4,
                    borderRadius: 3,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Typography variant="h5" fontWeight="bold" mb={2} sx={{color:"text.primary"}}>
                    Payment Successful
                </Typography>

                <Typography mb={1} sx={{color:"text.secondary"}}>
                    Your order has been placed successfully!
                </Typography>

                <Typography  mb={1}sx={{color:"text.secondary"}}>
                    Order ID: {orderId}
                </Typography>

                <Typography mb={3}sx={{color:"text.secondary"}}>
                    Estimated delivery: 3–5 days
                </Typography>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    sx={{ mt: 3,justifyContent:"center",alignItems:"center"}}
                >
                    <Button
                        variant="outlined"
                        onClick={() => router.push("/shop")}
                        sx={{
                            minWidth: 180,
                            height: 44,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 500,
                        }}
                    >
                        Continue Shopping
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => router.push("/orders")}
                        sx={{
                            minWidth: 180,
                            height: 44,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            boxShadow: 2,
                        }}
                    >
                        View Orders
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default SuccessView;