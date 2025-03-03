import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ff9800',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

export default theme;
