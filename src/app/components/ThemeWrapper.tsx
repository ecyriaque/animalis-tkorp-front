"use client";

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import natureTheme from "../themes/natureTheme";

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ThemeProvider theme={natureTheme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
