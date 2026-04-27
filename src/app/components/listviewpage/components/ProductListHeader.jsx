import React, { useState } from 'react';
import {
  Box, Typography, Stack, Select, MenuItem, Checkbox,
  FormControlLabel, IconButton, Button, Drawer, Divider
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import FilterSidebar from './FilterSidebar';

const ProductListHeader = ({
  category,
  activeFilters,
  onFilterToggle,
  priceRange,
  onPriceChange,
  verifiedOnly,
  onVerifiedChange,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const formatCategory = (str) => {
    if (!str) return "All Products";
    return str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  const handleDrawerToggle = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{
      p: { xs: 1, md: 2 },
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: '6px',
      mb: 2,
    }}>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ color: 'text.primary' }}>
          Items in <b>{formatCategory(category)}</b>
        </Typography>

        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={verifiedOnly}
                onChange={(e) => onVerifiedChange?.(e.target.checked)}
              />
            }
            label={
              <Typography sx={{ color: 'text.primary' }}>
                Verified only
              </Typography>
            }
          />
          <Select
            value={sortOption}
            onChange={(e) => onSortChange?.(e.target.value)}
            size="small"
            sx={{ height: '32px', minWidth: '120px' }}
          >
            <MenuItem value="Featured">Featured</MenuItem>
            <MenuItem value="Newest">Newest items</MenuItem>
          </Select>
          <Stack direction="row" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '4px', overflow: 'hidden' }}>
            <IconButton
              size="small"
              onClick={() => onViewModeChange?.('grid')}
              sx={{
                borderRadius: 0,
                borderRight: '1px solid',
                borderColor: 'divider',
                bgcolor: viewMode === 'grid' ? 'action.selected' : 'transparent',
              }}
              aria-pressed={viewMode === 'grid'}
            >
              <GridViewIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onViewModeChange?.('list')}
              sx={{ borderRadius: 0, bgcolor: viewMode === 'list' ? 'action.selected' : 'transparent' }}
              aria-pressed={viewMode === 'list'}
            >
              <ViewListIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      <Stack
        direction="row"

        sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: "space-between", alignItems: "center" }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Button
            variant="outlined"
            onClick={handleDrawerToggle(true)}
            endIcon={<FilterListIcon />}
            sx={{ textTransform: 'none', color: 'text.primary', borderColor: 'divider', fontWeight: 400, height: '32px' }}
          >
            Filter
          </Button>
          <Select
            value={sortOption}
            onChange={(e) => onSortChange?.(e.target.value)}
            size="small"
            sx={{ height: '32px', minWidth: '110px', fontWeight: 400 }}
          >
            <MenuItem value="Featured">Featured</MenuItem>
            <MenuItem value="Newest">Newest items</MenuItem>
          </Select>
        </Stack>

        <Stack direction="row" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '4px' }}>
          <IconButton
            size="small"
            onClick={() => onViewModeChange?.('grid')}
            sx={{
              borderRadius: 0,
              borderRight: '1px solid',
              borderColor: 'divider',
              bgcolor: viewMode === 'grid' ? 'action.selected' : 'transparent',
            }}
            aria-pressed={viewMode === 'grid'}
          >
            <GridViewIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onViewModeChange?.('list')}
            sx={{ borderRadius: 0, bgcolor: viewMode === 'list' ? 'action.selected' : 'transparent' }}
            aria-pressed={viewMode === 'list'}
          >
            <ViewListIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle(false)}
        PaperProps={{
          sx: { width: '280px', p: 2 }
        }}
      >
        <Stack direction="row" sx={{ mb: 1, alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Filters</Typography>
          <IconButton onClick={handleDrawerToggle(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ mb: 1 }} />

        <FilterSidebar
          activeFilters={activeFilters}
          onFilterToggle={onFilterToggle}
          isMobileDrawer={true}
          priceRange={priceRange}
          onPriceChange={onPriceChange}
        />

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleDrawerToggle(false)}
            sx={{ textTransform: 'none' }}
          >
            Show Results
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ProductListHeader;
