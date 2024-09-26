"use client";

import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Animalis
        </Typography>
        <Button color="inherit" onClick={() => router.push("/")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => router.push("/person")}>
          Owner
        </Button>
        <Button color="inherit" onClick={() => router.push("/animal")}>
          Animal
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
