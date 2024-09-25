"use client";

import React, { useState } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { CreatePersonDto } from "@/app/DTO/CreatePerson.dto";
import PersonService from "@/app/services/personService";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/app/components/Snackbar";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CreatePersonModalProps {
  open: boolean;
  onClose: () => void;
}

const CreatePersonModal: React.FC<CreatePersonModalProps> = ({
  open,
  onClose,
}) => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { openSnackbar } = useSnackbar();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // Validation pour firstName et lastName
    if (!/^[A-Za-z]+$/.test(firstName)) {
      newErrors.firstName = "First name must contain only letters";
    }
    if (!/^[A-Za-z]+$/.test(lastName)) {
      newErrors.lastName = "Last name must contain only letters";
    }

    // Validation pour email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email is not valid";
    }

    // Validation pour phoneNumber
    if (!/^[0-9-]+$/.test(phoneNumber)) {
      newErrors.phoneNumber =
        "Phone number must contain only digits and hyphens";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-z]/g, "");
    setFirstName(value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-z]/g, "");
    setLastName(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9-]/g, "");
    setPhoneNumber(value);
  };

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
