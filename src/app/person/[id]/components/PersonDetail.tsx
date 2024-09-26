"use client";

import {
  Card,
  Typography,
  Avatar,
  Grid,
  Box,
  Button,
  TextField,
  IconButton,
} from "@mui/material";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";
import { Person } from "@/app/models/person";
import AddAnimalModal from "./AddAnimalModal";
import AnimalCard from "./AnimalCard";
import { Animal } from "@/app/models/animal";
import { useConfirmationDialog } from "@/app/components/ConfirmationDialog";
import { useSnackbar } from "@/app/components/Snackbar";
import PersonService from "@/app/services/personService";
import { useRouter } from "next/navigation";
import { UpdatePersonDto } from "@/app/DTO/UpdatePerson.dto";

interface PersonDetailClientProps {
  person: Person;
}

const PersonDetail: React.FC<PersonDetailClientProps> = ({ person }) => {
  const [open, setOpen] = useState(false);
  const [animals, setAnimals] = useState(person.animals);
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);

  const [editedFirstName, setEditedFirstName] = useState(person.firstName);
  const [editedLastName, setEditedLastName] = useState(person.lastName);
  const [editedEmail, setEditedEmail] = useState(person.email);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(
    person.phoneNumber
  );

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

  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;
  const phoneRegex = /^[0-9-]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSaveChanges = async () => {
    if (!emailRegex.test(editedEmail)) {
      openSnackbar("Invalid email format", "error");
      return;
    }

    const updateData = new UpdatePersonDto({
      firstName: editedFirstName,
      lastName: editedLastName,
      email: editedEmail,
      phoneNumber: editedPhoneNumber,
    });

    await PersonService.updatePerson(person.id, updateData);
    setIsEditingFirstName(false);
    setIsEditingLastName(false);
    setIsEditingEmail(false);
    setIsEditingPhoneNumber(false);
    openSnackbar("Changes saved", "success");
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
          <Box
            sx={{
              backgroundColor: "#F5F5DC",
              padding: 3,
              borderRadius: 3,
              width: { xs: "90%", sm: "70%", md: "50%" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Person"
              src="/images/person.jpeg"
              sx={{ width: 80, height: 80, marginBottom: 2 }}
            />

            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="center"
              alignItems="center"
              mb={2}
            >
              {/* First Name */}
              <Box display="flex" alignItems="center" mr={2}>
                {!isEditingFirstName ? (
                  <>
                    <Typography variant="h5">{editedFirstName}</Typography>
                    <IconButton onClick={() => setIsEditingFirstName(true)}>
                      <EditIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={editedFirstName}
                      onChange={(e) => {
                        if (nameRegex.test(e.target.value)) {
                          setEditedFirstName(e.target.value);
                        }
                      }}
                    />
                    <IconButton onClick={handleSaveChanges}>
                      <SaveIcon />
                    </IconButton>
                  </>
                )}
              </Box>

              {/* Last Name */}
              <Box display="flex" alignItems="center">
                {!isEditingLastName ? (
                  <>
                    <Typography variant="h5">{editedLastName}</Typography>
                    <IconButton onClick={() => setIsEditingLastName(true)}>
                      <EditIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={editedLastName}
                      onChange={(e) => {
                        if (nameRegex.test(e.target.value)) {
                          setEditedLastName(e.target.value);
                        }
                      }}
                    />
                    <IconButton onClick={handleSaveChanges}>
                      <SaveIcon />
                    </IconButton>
                  </>
                )}
              </Box>
            </Box>

            {/* Email */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={2}
            >
              {!isEditingEmail ? (
                <>
                  <Typography variant="body1">
                    <AlternateEmailIcon fontSize="small" /> Email: {editedEmail}
                  </Typography>
                  <IconButton onClick={() => setIsEditingEmail(true)}>
                    <EditIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    error={!emailRegex.test(editedEmail)}
                    helperText={
                      !emailRegex.test(editedEmail)
                        ? "Invalid email format"
                        : ""
                    }
                  />
                  <IconButton onClick={handleSaveChanges}>
                    <SaveIcon />
                  </IconButton>
                </>
              )}
            </Box>

            {/* Phone Number */}
            {person.phoneNumber && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={2}
              >
                {!isEditingPhoneNumber ? (
                  <>
                    <Typography variant="body1">
                      <PhoneIcon fontSize="small" /> Phone: {editedPhoneNumber}
                    </Typography>
                    <IconButton onClick={() => setIsEditingPhoneNumber(true)}>
                      <EditIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={editedPhoneNumber}
                      onChange={(e) => {
                        if (phoneRegex.test(e.target.value)) {
                          setEditedPhoneNumber(e.target.value);
                        }
                      }}
                    />
                    <IconButton onClick={handleSaveChanges}>
                      <SaveIcon />
                    </IconButton>
                  </>
                )}
              </Box>
            )}

            {/* Delete Button */}
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
                color="error"
                startIcon={<DeleteIcon />}
                sx={{ mx: 1 }}
                onClick={handleDeletePerson}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Grid>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add Animal
          </Button>

          <AddAnimalModal
            open={open}
            handleClose={() => setOpen(false)}
            ownerId={person.id}
            onAddAnimal={handleAddAnimal}
          />
        </Box>

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

export default PersonDetail;
