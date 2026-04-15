import React from 'react';
import { Pagination, Select, MenuItem, Stack, Box, useMediaQuery, useTheme } from '@mui/material';

const PaginationSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'center', md: 'flex-end' }}
        spacing={2}
        sx={{
          width: "100%",
          mt: 4,
          mb: 6,
          alignItems: "center",
          gap: { xs: 2, sm: 0 }
        }}
      >
        <Select 
          defaultValue={10} 
          size="small" 
          sx={{ bgcolor: 'background.paper', minWidth: '120px' }}
        >
          <MenuItem value={10}>Show 10</MenuItem>
          <MenuItem value={20}>Show 20</MenuItem>
        </Select>

        <Pagination
          count={3}
          variant="outlined"
          shape="rounded"
          color="primary"
          size={isMobile ? "small" : "medium"} 
          sx={{
            '& .MuiPaginationItem-root': {
              bgcolor: 'background.paper',
            }
          }}
        />
      </Stack>
    </Box>
  );
};

export default PaginationSection;
