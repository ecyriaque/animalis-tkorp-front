"use client";

import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#4CAF50" }}>
      {" "}
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold", color: "#FFFFFF" }}
        >
          Animalis
        </Typography>
        <Button
          color="inherit"
          onClick={() => router.push("/")}
          sx={{ "&:hover": { backgroundColor: "#3E8E41" }, color: "#FFFFFF" }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          onClick={() => router.push("/person")}
          sx={{ "&:hover": { backgroundColor: "#3E8E41" }, color: "#FFFFFF" }}
        >
          Owner
        </Button>
        <Button
          color="inherit"
          onClick={() => router.push("/animal")}
          sx={{ "&:hover": { backgroundColor: "#3E8E41" }, color: "#FFFFFF" }}
        >
          Animal
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
