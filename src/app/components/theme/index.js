import { getPalette } from './palette';
import { typography } from './typography';

export const getThemeOptions = (mode) => ({
  palette: getPalette(mode),
  typography: typography,
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem', 
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none', 
        },
      },
    },
  },
});