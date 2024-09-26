"use client";
import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// This context will be used to display toasts throughout the application
type SnackbarContextType = {
  openSnackbar: (message: string, severity: "success" | "error") => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false); // State to control the snackbar visibility
  const [message, setMessage] = useState(""); // State to store the message to display
  const [severity, setSeverity] = useState<"success" | "error">("success"); // State for the message type (success or error)

  // Function to open the snackbar with a specified message and severity
  const openSnackbar = (message: string, severity: "success" | "error") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ fontSize: "1.5rem", padding: "16px 24px" }}
        >
          {message} // Message to display in the snackbar
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
