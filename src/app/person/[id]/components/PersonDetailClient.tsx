"use client";

import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { Person } from "@/app/models/person";
import AddAnimalModal from "./AddAnimalModal";
import AnimalCard from "./AnimalCard";
import { Animal } from "@/app/models/animal";

interface PersonDetailClientProps {
  person: Person;
}

const PersonDetailClient: React.FC<PersonDetailClientProps> = ({ person }) => {
  const [open, setOpen] = useState(false);
  const [animals, setAnimals] = useState(person.animals);

  const handleAddAnimal = (newAnimal: Animal) => {
    setAnimals((prevAnimals) => [...prevAnimals, newAnimal]);
    setOpen(false);
  };

  const handleDeleteAnimal = (animalId: number) => {
    setAnimals((prevAnimals) =>
      prevAnimals.filter((animal) => animal.id !== animalId)
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

        <Box
          sx={{
            mt: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              mr: 2,
            }}
          >
            My Animals
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ ml: 2 }}
          >
            <AddIcon /> Add Animal
          </Button>
        </Box>

        <AddAnimalModal
          open={open}
          handleClose={() => setOpen(false)}
          ownerId={person.id}
          onAddAnimal={handleAddAnimal}
        />
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {animals.map((animal) => (
            <Grid item xs={12} sm={6} md={4} key={animal.id}>
              <AnimalCard animal={animal} onDelete={handleDeleteAnimal} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Grid>
  );
};

export default PersonDetailClient;
