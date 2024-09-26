import { createTheme } from "@mui/material/styles";

const natureTheme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50",
    },
    secondary: {
      main: "#8D6E63",
    },
    background: {
      default: "#8D6E63",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default natureTheme;
