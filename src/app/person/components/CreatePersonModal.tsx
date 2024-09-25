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
  onClose: () => void; // Type de onClose
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
  const { openSnackbar } = useSnackbar();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
