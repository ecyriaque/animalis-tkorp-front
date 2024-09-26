// src/app/components/EditAnimalModal.tsx
import React, { useState } from "react";
import { Box, Typography, Button, Modal, TextField } from "@mui/material";
import { Animal } from "@/app/models/animal";

interface EditAnimalModalProps {
  open: boolean;
  onClose: () => void;
  animal: Animal;
  onUpdate: (updatedAnimal: Animal) => Promise<void>;
}

const EditAnimalModal: React.FC<EditAnimalModalProps> = ({
  open,
  onClose,
  animal,
  onUpdate,
}) => {
  const [updatedAnimal, setUpdatedAnimal] = useState(animal);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedAnimal({ ...updatedAnimal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await onUpdate(updatedAnimal);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} // Centrer le modal
    >
      <Box
        sx={{
          padding: 4,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          width: "400px", // Largeur fixe pour le modal
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Edit Animal
        </Typography>

        <TextField
          name="name"
          label="Name"
          value={updatedAnimal.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="weight"
          label="Weight"
          type="number"
          value={updatedAnimal.weight}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="breed"
          label="Breed"
          value={updatedAnimal.breed}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="color"
          label="Color"
          value={updatedAnimal.color}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="species"
          label="Species"
          value={updatedAnimal.species}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          value={updatedAnimal.dateOfBirth?.split("T")[0] || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditAnimalModal;
