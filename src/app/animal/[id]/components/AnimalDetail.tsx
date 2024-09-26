"use client";
// src/app/components/AnimalDetail.tsx
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { Animal } from "@/app/models/animal";
import { AnimalService } from "@/app/services/animalService";
import { useConfirmationDialog } from "@/app/components/ConfirmationDialog";
import { useSnackbar } from "@/app/components/Snackbar";
import { useRouter } from "next/navigation";
import { Person } from "@/app/models/person";
import EditAnimalModal from "./EditAnimalModal";

interface AnimalDetailProps {
  animal: Animal;
  owner: Person;
}

const AnimalDetail: React.FC<AnimalDetailProps> = ({ animal, owner }) => {
  const imageUrl = AnimalService.getImage(animal.species, animal.id);
  const { openConfirmationDialog } = useConfirmationDialog();
  const { openSnackbar } = useSnackbar();
  const router = useRouter();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [localAnimal, setLocalAnimal] = useState(animal);

  const handleUpdate = async (updatedAnimal: Animal) => {
    try {
      const response = await AnimalService.updateAnimal(
        animal.id,
        updatedAnimal
      );
      openSnackbar(response.message, "success");
      setLocalAnimal(updatedAnimal);
    } catch (error) {
      console.error("Failed to update animal:", error);
      openSnackbar("Failed to update animal. Please try again.", "error");
    }
  };

  const handleDelete = () => {
    openConfirmationDialog(
      "Confirm the deletion",
      "Are you sure you want to remove this animal?",
      async () => {
        try {
          const response = await AnimalService.deleteAnimal(animal.id);
          router.push("/animal");
          openSnackbar(response.message, "success");
        } catch (error) {
          console.error("Failed to delete animal:", error);
          openSnackbar("Failed to delete animal. Please try again.", "error");
        }
      }
    );
  };

  const calculateAge = (
    dateOfBirth: string
  ): { years: number; months: number } => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months };
  };

  const { years, months } = calculateAge(localAnimal.dateOfBirth);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        padding: 4,
        backgroundColor: "#E8F5E9",
        textAlign: "center",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Image
        src={imageUrl}
        alt={localAnimal.name}
        width={400}
        height={400}
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      />

      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#2E7D32" }}
      >
        Hi, I'm {localAnimal.name}!
      </Typography>

      <Typography
        variant="h6"
        color="textSecondary"
        gutterBottom
        sx={{ fontStyle: "italic", color: "#4CAF50" }}
      >
        I have{" "}
        {years > 0
          ? `${years} year${years > 1 ? "s" : ""}`
          : `${months} month${months > 1 ? "s" : ""}`}{" "}
        old.
      </Typography>

      <Typography
        variant="h6"
        color="textSecondary"
        gutterBottom
        sx={{ fontStyle: "italic", color: "#4CAF50" }}
      >
        I'm a {localAnimal.species}, and I weigh {localAnimal.weight} kg.
      </Typography>

      <Typography
        variant="body1"
        gutterBottom
        sx={{ margin: "10px 0", fontSize: "1.1rem" }}
      >
        I am of breed <strong>{localAnimal.breed}</strong> and my color is{" "}
        <strong>{localAnimal.color}</strong>.
      </Typography>

      {owner && (
        <Typography
          variant="body1"
          gutterBottom
          onClick={() => router.push(`/person/${owner.id}`)}
        >
          I belong to{" "}
          <strong
            style={{ fontSize: "1.1rem", cursor: "pointer", color: "#1976D2" }}
          >
            {owner.firstName} {owner.lastName}
          </strong>
          .
        </Typography>
      )}

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setEditModalOpen(true)}
        >
          Edit Animal
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Animal
        </Button>
      </Box>

      <EditAnimalModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        animal={localAnimal}
        onUpdate={handleUpdate}
      />
    </Box>
  );
};

export default AnimalDetail;
