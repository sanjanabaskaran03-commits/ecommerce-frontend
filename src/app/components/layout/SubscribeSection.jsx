"use client";

import React from 'react';
import { Box, Typography, TextField, Button, InputAdornment, useTheme } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LayoutContainer from '../../components/common/LayoutContainer';

const SubscribeSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ width: '100%', bgcolor: isDark ? 'background.default' : '#EFF2F4', py: 6 }}>
      <LayoutContainer>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Subscribe on our newsletter
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, fontSize: '16px' }}>
            Get daily news on upcoming offers from many suppliers all over the world
          </Typography>

          <Box
            component="form"
            sx={{
              display: 'flex',
              gap: 1,
              // xs/sm: Stacked & wider | md/lg: Row & fixed width
              width: { xs: '100%', md: '400px' },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <TextField
              fullWidth
              placeholder="Email"
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ bgcolor: 'background.paper', borderRadius: '6px' }}
            />
            <Button
              variant="contained"
              disableElevation
              sx={{
                bgcolor: '#127FFF',
                textTransform: 'none',
                px: 3,
                fontWeight: 400,
                width: { xs: '100%', md: 'auto' }
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </LayoutContainer>
    </Box>
  );
};

export default SubscribeSection;