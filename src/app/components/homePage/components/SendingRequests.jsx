"use client";
import React from 'react';
import { 
  Box, Typography, Button, Paper, TextField, 
  Stack, MenuItem, Select, useTheme 
} from '@mui/material';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';

const SendingRequests = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const blackTextStyle = {
    "& .MuiOutlinedInput-input": {
      color: isDark ? '#fff' : '#1C1C1C', 
    },
    "& .MuiOutlinedInput-input::placeholder": {
      color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#1C1C1C',
      opacity: 1, 
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
    }
  };

  return (
    <LayoutContainer>
      <Box
        sx={{
          borderRadius: { xs: '8px', md: '8px' }, 
          overflow: 'hidden',
          position: 'relative',
          backgroundImage: isDark 
            ? `linear-gradient(90deg, #494b4e 0%, rgba(22, 28, 36, 0.8) 100%), url('/images/homepage/sendingrequest/sendingrequest_bg.png')`
            : `linear-gradient(90deg, #2C7CF1 0%, rgba(0, 209, 255, 0.5) 100%), url('/images/homepage/sendingrequest/sendingrequest_bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          p: { xs: 3, md: 5 },
          minHeight: { xs: 'auto', md: '420px' }
        }}
      >

        <Box sx={{ color: '#fff', maxWidth: '440px', textAlign: 'left', mt: { md: 2 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600, 
              mb: { xs: 3, md: 2 }, 
              lineHeight: 1.2,
              fontSize: { xs: '18px', md: '32px' } 
            }}
          >
            An easy way to send <br /> requests to all suppliers
          </Typography>
          
          <Typography sx={{ display: { xs: 'none', md: 'block' }, opacity: 0.8, fontSize: '16px' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
            sed do eiusmod tempor incididunt.
          </Typography>

          <Button
            variant="contained"
            disableElevation
            sx={{
              display: { xs: 'block', md: 'none' },
              bgcolor: '#0D6EFD',
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: '6px',
              fontSize: '13px',
              px: 2,
              py: 0.5
            }}
          >
            Send inquiry
          </Button>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            width: { xs: '100%', sm: '440px' },
            borderRadius: '10px',
            bgcolor: isDark ? 'background.paper' : '#fff',
            display: { xs: 'none', md: 'flex' }, 
            flexDirection: 'column',
            gap: 2,
            mt: { xs: 4, md: 0 },
            alignSelf: 'center',
            border: isDark ? '1px solid' : 'none',
            borderColor: 'divider'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: isDark ? '#ffffff' : '#1C1C1C' }}>
            Send quote to suppliers
          </Typography>

          <TextField
            fullWidth
            placeholder="What item you need?"
            variant="outlined"
            size="small"
            sx={blackTextStyle}
          />

          <TextField
            fullWidth
            placeholder="Type more details"
            multiline
            rows={3}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                alignItems: "flex-start",
                paddingTop: "8px",
              }
            }}
          />

          <Stack direction="row" spacing={1}>
            <TextField
              placeholder="Quantity"
              variant="outlined"
              size="small"
              sx={{ flex: 2, ...blackTextStyle }}
            />
            <Select
              defaultValue="Pcs"
              size="small"
              sx={{ 
                flex: 1, 
                color: isDark ? '#fff' : "#1C1C1C",
                "& .MuiSelect-select": { color: isDark ? '#fff' : "#1C1C1C" },
                textAlign: "left"
              }}
            >
              <MenuItem value="Pcs">Pcs</MenuItem>
              <MenuItem value="Kg">Kg</MenuItem>
              <MenuItem value="Boxes">Boxes</MenuItem>
            </Select>
          </Stack>

          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: isDark ? 'primary.main' : '#0D6EFD',
              textTransform: 'none',
              fontWeight: 400,
              width: 'fit-content',
              px: 3,
              py: 1,
              mt: 1,
              '&:hover': { bgcolor: isDark ? 'primary.dark' : '#0b5ed7' }
            }}
          >
            Send inquiry
          </Button>
        </Paper>

      </Box>
    </LayoutContainer>
  );
};

export default SendingRequests;