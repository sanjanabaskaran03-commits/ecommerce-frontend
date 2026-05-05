"use client";

import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Divider, Accordion, AccordionSummary, Link, 
  AccordionDetails, Checkbox, FormControlLabel, Stack, TextField, 
  Button, Slider, Rating 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import {
  DEFAULT_CATEGORIES,
  extractFeatures,
  getDerivedBrand,
  normalizeCategoryParam,
  unwrapProductsResponse,
} from "@/src/app/utils/productFilters";

const FilterSection = ({ title, children, onSeeAll, hasMore = false, seeAllText = "See all" }) => (
  <Accordion defaultExpanded elevation={0} sx={{ '&:before': { display: 'none' }, bgcolor: 'transparent' }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'text.primary' }} />} sx={{ px: 0 }}>
      <Typography sx={{ fontWeight: 600, fontSize: '16px', color: 'text.primary' }}>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ px: 0, pt: 0 }}>
      {children}
      {hasMore && (
        <Link 
          component="button"
          onClick={onSeeAll}
          underline="none" 
          sx={{ mt: 1, display: 'block', fontSize: '14px', color: 'primary.main', textAlign: 'left' }}
        >
          {seeAllText} 
        </Link>
      )}
    </AccordionDetails>
  </Accordion>
);

const FilterSidebar = ({
  activeFilters = [],
  onFilterToggle,
  isMobileDrawer = false,
  priceRange = [0, 1000],
  onPriceChange,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [expandedSections, setExpandedSections] = useState({});
  const [draftPrice, setDraftPrice] = useState(priceRange);
  const [allCategories, setAllCategories] = useState([]);
  const [dynamicBrands, setDynamicBrands] = useState([]);
  const [dynamicFeatures, setDynamicFeatures] = useState([]);

  const searchParams = useSearchParams();
  const router = useRouter(); 
  
  const currentCategory = normalizeCategoryParam(searchParams.get('category'));
  const isChecked = (value) => activeFilters.includes(value);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await fetch(`/api/products`);
        const json = await res.json();
        const products = unwrapProductsResponse(json);

        const productCategories = [
          ...new Set(products.map((item) => item?.category).filter(Boolean)),
        ];
        const extraCategories = productCategories
          .filter(
            (c) =>
              !DEFAULT_CATEGORIES.some(
                (d) => String(d).toLowerCase() === String(c).toLowerCase()
              )
          )
          .sort((a, b) => String(a).localeCompare(String(b)));
        const categories = [...DEFAULT_CATEGORIES, ...extraCategories];
        setAllCategories(categories);

        const relevant = currentCategory
          ? products.filter(
              (p) =>
                String(p?.category || "").toLowerCase() ===
                currentCategory.toLowerCase()
            )
          : products;

        const brands = [
          ...new Set(relevant.map((item) => getDerivedBrand(item)).filter(Boolean)),
        ].sort((a, b) => String(a).localeCompare(String(b)));
        setDynamicBrands(brands);

        const features = [
          ...new Set(relevant.flatMap((item) => extractFeatures(item)).filter(Boolean)),
        ].sort((a, b) => String(a).localeCompare(String(b)));
        setDynamicFeatures(features);
      } catch (error) {
        console.error("Filter fetch error:", error);
      }
    };
    fetchFilters();
  }, [currentCategory]);

  useEffect(() => {
    setDraftPrice(priceRange);
  }, [priceRange]);

  const handleToggleSeeAll = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getVisibleItems = (items, sectionKey, limit = 4) => {
    return expandedSections[sectionKey] ? items : items.slice(0, limit);
  };

  const handleCategoryClick = (category) => {
    const urlFriendly = category.toLowerCase().replace(/\s+/g, '-');
    router.push(`/shop?category=${urlFriendly}`);
  };

  const getFeatures = () => {
    const cat = (currentCategory || "").toLowerCase();

    if (cat.includes('clothes')) {
      return ['Cotton', 'Leather', 'Woolen', 'Summer', 'Winter', 'Biker', 'Slim Fit', 'Denim'];
    }
    if (cat.includes('home') || cat.includes('interiors')) {
      return ['Wooden', 'Velvet', 'Ceramic', 'Luxury', 'Minimalist', 'Soft', 'Modern'];
    }
    if (cat.includes('computer') || cat.includes('tech') || cat.includes('mobile')) {
      return ['8GB Ram', '16GB Ram', 'Metallic', 'SSD Storage', 'Super power', 'Fast charging', 'Water resistant'];
    }
    if (cat.includes('accessories')) {
      return ['Leather', 'Metallic', 'Waterproof', 'Wireless', 'Noise Cancelling', 'Modern tech'];
    }
    if (cat.includes('sports') || cat.includes('outdoor')) {
      return ['Waterproof', 'Lightweight', 'Metallic', 'Heavy Duty', 'Portable'];
    }
    if (cat.includes('animal') || cat.includes('pets')) {
      return ['Soft', 'Leather', 'Modern tech', 'Professional', 'Luxury'];
    }
    if (cat.includes('machinery')) {
      return ['Steel', 'Heavy Duty', 'Professional', 'Electric', 'Manual'];
    }

    return ['Quality Material', 'New Arrival', 'Best Seller', 'Metallic', 'Plastic cover'];
  };

  const features = dynamicFeatures.length ? dynamicFeatures : getFeatures();

  const handleApplyPrice = () => {
    onPriceChange?.(draftPrice);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: { xs: isMobileDrawer ? 'block' : 'none', md: 'block' }, textAlign: 'left' }}>
        
        {/* Category Section */}
        <FilterSection 
          title="Category" 
          hasMore={allCategories.length > 4} 
          seeAllText={expandedSections['categories'] ? "Show less" : "See all"}
          onSeeAll={() => handleToggleSeeAll('categories')}
        >
          <Stack spacing={1.5}>
            {getVisibleItems(allCategories, 'categories').map(item => {
              const isActive = currentCategory?.toLowerCase() === item.toLowerCase();
              return (
                <Typography 
                  key={item} 
                  onClick={() => handleCategoryClick(item)} 
                  sx={{ 
                    color: isActive ? 'primary.main' : 'text.secondary', 
                    cursor: 'pointer', 
                    fontSize: '16px', 
                    fontWeight: isActive ? 600 : 400,
                    '&:hover': { color: 'primary.main' } 
                  }}
                >
                  {item}
                </Typography>
              );
            })}
          </Stack>
        </FilterSection>

        <Divider sx={{ my: 1 }} />

        {/* Brands Section */}
        <FilterSection 
          title="Brands" 
          hasMore={dynamicBrands.length > 4} 
          seeAllText={expandedSections['brands'] ? "Show less" : "See all"}
          onSeeAll={() => handleToggleSeeAll('brands')}
        >
          <Stack>
            {getVisibleItems(dynamicBrands, 'brands').map(brand => (
              <FormControlLabel 
                key={brand} 
                control={<Checkbox size="small" checked={isChecked(brand)} onChange={() => onFilterToggle(brand)} />} 
                label={<Typography sx={{ fontSize: '16px', color: 'text.secondary' }}>{brand}</Typography>} 
              />
            ))}
          </Stack>
        </FilterSection>

        <Divider sx={{ my: 1 }} />

        {/* Features Section */}
        <FilterSection 
          title="Features" 
          hasMore={features.length > 4} 
          seeAllText={expandedSections['features'] ? "Show less" : "See all"}
          onSeeAll={() => handleToggleSeeAll('features')}
        >
          <Stack>
            {getVisibleItems(features, 'features').map(feature => (
              <FormControlLabel 
                key={feature} 
                control={<Checkbox size="small" checked={isChecked(feature)} onChange={() => onFilterToggle(feature)} />} 
                label={<Typography sx={{ fontSize: '16px', color: 'text.secondary' }}>{feature}</Typography>} 
              />
            ))}
          </Stack>
        </FilterSection>

        <Divider sx={{ my: 1 }} />

        {/* Price range Section */}
        <FilterSection title="Price range">
          <Stack spacing={2} sx={{ px: 1, mt: 1 }}>
            <Slider
              value={draftPrice}
              onChange={(e, newValue) => setDraftPrice(newValue)}
              min={0} max={5000} 
              sx={{ color: 'primary.main', height: 4 }} 
            />
            <Stack direction="row" spacing={1}>
              <TextField 
                size="small" 
                placeholder="Min" 
                value={draftPrice[0]}
                onChange={(e) => setDraftPrice([Number(e.target.value), draftPrice[1]])}
                sx={{ bgcolor: 'background.paper' }} 
              />
              <TextField 
                size="small" 
                placeholder="Max" 
                value={draftPrice[1]}
                onChange={(e) => setDraftPrice([draftPrice[0], Number(e.target.value)])}
                sx={{ bgcolor: 'background.paper' }} 
              />
            </Stack>
            <Button variant="outlined" fullWidth onClick={handleApplyPrice} sx={{ textTransform: 'none' }}>
              Apply
            </Button>
          </Stack>
        </FilterSection>

        <Divider sx={{ my: 1 }} />

        {/* Ratings Section */}
        <FilterSection title="Ratings">
          <Stack spacing={0.5}>
            {[5, 4, 3, 2].map((stars) => (
              <FormControlLabel 
                key={stars}
                control={<Checkbox size="small" checked={isChecked(`${stars} star`)} onChange={() => onFilterToggle(`${stars} star`)} />} 
                label={<Rating value={stars} readOnly size="small" sx={{ color: isDark ? '#ffb347' : '#FF9017' }} />} 
              />
            ))}
          </Stack>
        </FilterSection>

      </Box>
    </Box>
  );
};

export default FilterSidebar;
