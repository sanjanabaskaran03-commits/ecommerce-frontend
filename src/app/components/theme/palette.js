export const getPalette = (mode) => ({
  mode,
  primary: { main: '#0D6EFD' },
  success: { main: '#00B517' }, // For "Free Shipping"
  background: {
    default: mode === 'light' ? '#F7FAFC' : '#0D1117',
    paper: mode === 'light' ? '#FFFFFF' : '#161B22',
  },
  text: {
    primary: mode === 'light' ? '#1C1C1C' : '#F0F6FC',
    secondary: mode === 'light' ? '#505050' : '#8B96A5',
    third:mode === 'light' ? '#505050' : '#fff',
    fourth: mode === 'light' ? '#8B96A5' : '#fff',
  },
  divider: mode === 'light' ? '#E0E7E9' : '#30363D',
});

export const brandAssets = {
  logo: {
    light: "/assets/logo-blue.svg",
    dark: "/assets/logo-white.svg",
  },
};