import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AnimalService } from "@/app/services/animalService";
import { CreateAnimalDto } from "@/app/DTO/CreateAnimal.dto";
import { Animal } from "@/app/models/animal";

interface AddAnimalModalProps {
  open: boolean;
  handleClose: () => void;
  ownerId: number;
  onAddAnimal: (animal: Animal) => void;
}

const AddAnimalModal: React.FC<AddAnimalModalProps> = ({
  open,
  handleClose,
  ownerId,
  onAddAnimal,
}) => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("Dog");
  const [weight, setWeight] = useState<number>(0);
  const [color, setColor] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [breed, setBreed] = useState("");
  const [image, setImage] = useState<string>("");

  const allowedSpecies = ["Cat", "Bird", "Rabbit", "Hamster", "Turtle", "Dog"];

  useEffect(() => {
    const fetchImage = () => {
      const img = AnimalService.getImage(species);
      setImage(img);
    };

    if (open) {
      fetchImage();
    }
  }, [open, species]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const animalData = new CreateAnimalDto({
      name,
      species,
      weight,
      color,
      dateOfBirth: new Date(dateOfBirth),
      breed,
      ownerId,
    });

    try {
      const { message, animal } = await AnimalService.createAnimal(animalData);

      const newAnimal: Animal = {
        id: animal.id,
        name,
        species,
        weight,
        color,
        dateOfBirth,
        breed,
        ownerId,
      };

      onAddAnimal(newAnimal);
      handleClose();
    } catch (error) {
      console.error("Error creating animal:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          padding: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "80%", sm: "350px" },
          maxWidth: "90%",
          overflow: "hidden",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Add Animal
        </Typography>

        {image && (
          <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
            <img
              src={image}
              alt={`Image of ${species}`}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "150px",
                borderRadius: "8px",
              }}
            />
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Species</InputLabel>
            <Select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              label="Species"
            >
              {allowedSpecies.map((specie) => (
                <MenuItem key={specie} value={specie}>
                  {specie}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Weight (kg)"
            type="number"
            fullWidth
            margin="normal"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            required
          />
          <TextField
            label="Color"
            fullWidth
            margin="normal"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
          <TextField
            label="Breed"
            fullWidth
            margin="normal"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
            Add Animal
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddAnimalModal;
