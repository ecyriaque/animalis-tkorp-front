"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { Animal } from "@/app/models/animal";
import { AnimalService } from "@/app/services/animalService";
import { useConfirmationDialog } from "@/app/components/ConfirmationDialog";
import { useSnackbar } from "@/app/components/Snackbar";
import { useRouter } from "next/navigation";
import { Person } from "@/app/models/person";

interface AnimalDetailProps {
  animal: Animal;
  owner: Person;
}

const AnimalDetail: React.FC<AnimalDetailProps> = ({ animal, owner }) => {
  const imageUrl = AnimalService.getImage(animal.species, animal.id);
  const { openConfirmationDialog } = useConfirmationDialog();
  const { openSnackbar } = useSnackbar();
  const router = useRouter();

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
        alt={animal.name}
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
        Hi, I'm {animal.name}!
      </Typography>

      <Typography
        variant="h6"
        color="textSecondary"
        gutterBottom
        sx={{ fontStyle: "italic", color: "#4CAF50" }}
      >
        I'm a {animal.species}, and I weigh {animal.weight} kg.
      </Typography>

      <Typography
        variant="body1"
        gutterBottom
        sx={{ margin: "10px 0", fontSize: "1.1rem" }}
      >
        I am of breed <strong>{animal.breed}</strong>.
      </Typography>

      {owner && (
        <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
          I belong to{" "}
          <strong>
            {owner.firstName} {owner.lastName}
          </strong>
          .
        </Typography>
      )}

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary">
          Edit Animal
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Animal
        </Button>
      </Box>
    </Box>
  );
};

export default AnimalDetail;
