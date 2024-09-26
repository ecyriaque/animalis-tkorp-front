"use client";

import React, { useState } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { CreatePersonDto } from "@/app/DTO/CreatePerson.dto";
import PersonService from "@/app/services/personService";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/app/components/Snackbar";

// Style for the modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 280,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
  "@media (max-width:600px)": {
    width: "90%",
    margin: "0 16px",
  },
};

// Props interface for the CreatePersonModal component
interface CreatePersonModalProps {
  open: boolean; // Determines if the modal is open or closed
  onClose: () => void; // Function to handle closing the modal
}

// CreatePersonModal functional component
const CreatePersonModal: React.FC<CreatePersonModalProps> = ({
  open,
  onClose,
}) => {
  const router = useRouter(); // Router for navigation
  // State variables for person details
  const [firstName, setFirstName] = useState(""); // First name input
  const [lastName, setLastName] = useState(""); // Last name input
  const [email, setEmail] = useState(""); // Email input
  const [phoneNumber, setPhoneNumber] = useState(""); // Phone number input

  // State for validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { openSnackbar } = useSnackbar(); // Snackbar for notifications

  // Function to validate input fields
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // Validation for firstName and lastName
    if (!/^[A-Za-z]+$/.test(firstName)) {
      newErrors.firstName = "First name must contain only letters";
    }
    if (!/^[A-Za-z]+$/.test(lastName)) {
      newErrors.lastName = "Last name must contain only letters";
    }

    // Validation for email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email is not valid";
    }

    // Validation for phoneNumber
    if (!/^[0-9-]+$/.test(phoneNumber)) {
      newErrors.phoneNumber =
        "Phone number must contain only digits and hyphens";
    }

    setErrors(newErrors); // Update error state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handlers for input changes
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-z]/g, ""); // Allow only letters
    setFirstName(value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-z]/g, ""); // Allow only letters
    setLastName(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // Get email input value
    setEmail(value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9-]/g, ""); // Allow only digits and hyphens
    setPhoneNumber(value);
  };

  // Handler for form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const personData: CreatePersonDto = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };

    try {
      const response = await PersonService.createPerson(personData);
      openSnackbar(response.message, "success");
      onClose();
      const personId = response.person.id;

      router.push(`/person/${personId}`);
    } catch (error) {
      console.log(error);
      openSnackbar("Error creating person", "error");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Add a New Owner
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={handleEmailChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreatePersonModal;
