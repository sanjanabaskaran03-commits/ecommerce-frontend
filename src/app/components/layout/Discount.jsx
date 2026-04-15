import React from 'react';
import {
  Box, Typography, Stack, Button, useTheme
} from '@mui/material';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';

const Discount = () => {
  return (
    <LayoutContainer>
      <Box
        sx={{
          borderRadius: '10px',
          mt: 3,
          overflow: 'hidden',
          background: 'linear-gradient(58deg, #237CFF 65%, #005ADE 65%)',
          mb: 10
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          textAlign={{ xs: 'center', md: 'left' }}
          sx={{ p: { xs: 3, md: 4 }, gap: 3, alignItems: "center" }}
        >
          <Stack spacing={0.5}>
            <Typography sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: "600", color: "#fff" }}>
              Super discount on more than 100 USD
            </Typography>
            <Typography sx={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.8)" }}>
              Have you ever finally just write dummy info
            </Typography>
          </Stack>

          <Button
            variant="contained"
            sx={{
              bgcolor: '#FF9017',
              color: '#fff',
              textTransform: 'none',
              px: 3,
              py: 1,
              '&:focus': { outline: 'none' }
            }}
          >
            Shop now
          </Button>
        </Stack>
      </Box>
    </LayoutContainer>
  );
};

export default Discount;
