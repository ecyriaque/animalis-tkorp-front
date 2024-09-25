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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { Person } from "@/app/models/person";
import AddAnimalModal from "./AddAnimalModal";
import AnimalCard from "./AnimalCard";
import { Animal } from "@/app/models/animal";
import { useConfirmationDialog } from "@/app/components/ConfirmationDialog";
import { useSnackbar } from "@/app/components/Snackbar";
import PersonService from "@/app/services/personService";
import { useRouter } from "next/navigation";

interface PersonDetailClientProps {
  person: Person;
}

const PersonDetailClient: React.FC<PersonDetailClientProps> = ({ person }) => {
  const [open, setOpen] = useState(false);
  const [animals, setAnimals] = useState(person.animals);
  const { openConfirmationDialog } = useConfirmationDialog();
  const { openSnackbar } = useSnackbar();
  const router = useRouter();

  const handleAddAnimal = (newAnimal: Animal) => {
    setAnimals((prevAnimals) => [...prevAnimals, newAnimal]);
    setOpen(false);
  };

  const handleDeleteAnimal = (animalId: number) => {
    setAnimals((prevAnimals) =>
      prevAnimals.filter((animal) => animal.id !== animalId)
    );
  };

  const handleDeletePerson = () => {
    console.log(animals);
    openConfirmationDialog(
      "Confirm the deletion",
      `Are you sure you want to remove ${person.firstName} ${person.lastName}?`,
      async () => {
        try {
          const response = await PersonService.deletePerson(person.id);
          openSnackbar(response.message, "success");
          router.push("/person");
        } catch (error) {
          console.error("Failed to delete person:", error);
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              sx={{ mx: 1 }}
              onClick={() => console.log("Edit person")}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              sx={{ mx: 1 }}
              onClick={handleDeletePerson}
            >
              Delete
            </Button>
          </Box>
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
