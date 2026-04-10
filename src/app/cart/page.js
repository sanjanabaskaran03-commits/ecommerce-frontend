import React from 'react';
import { Container, Box, Typography, Stack } from '@mui/material';
import CartItem from '@/src/app/components/cartpage/components/CartItem';
import Label from '@/src/app/components/cartpage/components/Label';
import Discount from "@/src/app/components/layout/Discount";
import SavedForLater from '@/src/app/components/cartpage/components/SavedForLater';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';

const Cart = () => {
  return (
    <>
        <CartItem />
        <Label />
        <SavedForLater />
        <Discount />
        </>
  );
};

export default Cart;