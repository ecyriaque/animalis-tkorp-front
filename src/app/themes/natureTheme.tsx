import { createTheme } from "@mui/material/styles";

const natureTheme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // Un vert naturel
    },
    secondary: {
      main: "#8D6E63", // Un brun terreux
    },
    background: {
      default: "#F5F5DC", // Un beige doux
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default natureTheme;
