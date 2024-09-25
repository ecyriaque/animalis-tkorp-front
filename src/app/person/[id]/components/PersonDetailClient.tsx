"use client";

import { AnimalService } from "@/app/services/animalService";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box,
  Button,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import WeightIcon from "@mui/icons-material/FitnessCenter";
import PetsIcon from "@mui/icons-material/Pets";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DeleteIcon from "@mui/icons-material/Delete";
import { Person } from "@/app/models/person";
import { Animal } from "@/app/models/animal";
import AddAnimalModal from "./AddAnimalModal";
import React, { useState } from "react";
import { useConfirmationDialog } from "@/app/components/ConfirmationDialog";
import { useSnackbar } from "@/app/components/Snackbar";

interface PersonDetailClientProps {
  person: Person;
}

const PersonDetailClient: React.FC<PersonDetailClientProps> = ({ person }) => {
  const [open, setOpen] = useState(false);
  const { openConfirmationDialog } = useConfirmationDialog();
  const { openSnackbar } = useSnackbar();

  const [animals, setAnimals] = useState(person.animals);

  const handleAddAnimal = (newAnimal: Animal) => {
    setAnimals((prevAnimals) => [...prevAnimals, newAnimal]);
    setOpen(false);
  };

  const handleDeleteAnimal = async (animalId: number) => {
    openConfirmationDialog(
      "Confirm the deletion",
      "Are you sure you want to remove this animal ?",
      async () => {
        try {
          const response = await AnimalService.deleteAnimal(animalId);
          setAnimals((prevAnimals) =>
            prevAnimals.filter((animal) => animal.id !== animalId)
          );
          openSnackbar(response.message, "success");
        } catch (error) {
          console.error("Failed to delete animal:", error);
        }
      }
    );
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#E8F5E9",
      }}
    >
      <Card sx={{ width: "100%", padding: 3, borderRadius: 3 }}>
        <Grid container direction="column" alignItems="center">
          <Avatar sx={{ bgcolor: "#4CAF50", width: 80, height: 80 }}>
            <AccountCircleIcon style={{ fontSize: 60 }} />
          </Avatar>

          <Typography
            variant="h4"
            component="div"
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            {person.firstName} {person.lastName}
          </Typography>

          <CardContent>
            <Typography variant="body1">
              <AlternateEmailIcon fontSize="small" /> Email: {person.email}
            </Typography>
            {person.phoneNumber && (
              <Typography variant="body1">
                <PhoneIcon fontSize="small" /> Phone: {person.phoneNumber}
              </Typography>
            )}
          </CardContent>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            component="div"
            align="center"
            sx={{ fontWeight: "bold" }}
          >
            My Animals
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ mt: 2 }}
          >
            Add Animal
          </Button>
          <AddAnimalModal
            open={open}
            handleClose={() => setOpen(false)}
            ownerId={person.id}
            onAddAnimal={handleAddAnimal}
          />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {animals.map((animal) => (
              <Grid item xs={12} sm={6} md={4} key={animal.id}>
                <Card
                  sx={{
                    padding: 2,
                    textAlign: "center",
                    background: "#F5F5DC",
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  <img
                    src={AnimalService.getImage(animal.species, animal.id)}
                    alt={animal.name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "contain",
                      borderRadius: 8,
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {animal.name}
                  </Typography>
                  <Typography color="primary">
                    <PetsIcon fontSize="small" /> {animal.species}
                  </Typography>
                  <Typography variant="body2">
                    <WeightIcon fontSize="small" /> Weight: {animal.weight} kg
                  </Typography>
                  <Typography variant="body2">
                    <CategoryIcon fontSize="small" />
                    Breed: {animal.breed}
                  </Typography>
                  <Typography variant="body2">
                    <DateRangeIcon fontSize="small" /> Date of Birth:{" "}
                    {animal.dateOfBirth.split("T")[0]}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteAnimal(animal.id)}
                    sx={{ mt: 2 }}
                  >
                    Delete
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Card>
    </Grid>
  );
};

export default PersonDetailClient;
