"use client";

import { Card, Typography, Button, CardMedia } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import DeleteIcon from "@mui/icons-material/Delete";
import { AnimalService } from "@/app/services/animalService";
import { useConfirmationDialog } from "@/app/components/ConfirmationDialog";
import { useSnackbar } from "@/app/components/Snackbar";
import { useRouter } from "next/navigation";

interface AnimalCardProps {
  animal: {
    id: number;
    name: string;
    species: string;
  };
  onDelete: (id: number) => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onDelete }) => {
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
          onDelete(animal.id);
          openSnackbar(response.message, "success");
        } catch (error) {
          console.error("Failed to delete animal:", error);
        }
      }
    );
  };

  return (
    <Card
      sx={{
        padding: 2,
        textAlign: "center",
        background: "#F5F5DC",
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
        },
        backgroundColor: "#DCDCC6",
      }}
    >
      <CardMedia
        component="img"
        height="100vh"
        image={AnimalService.getImage(animal.species, animal.id)}
        style={{
          objectFit: "contain",
          borderRadius: 8,
        }}
      />

      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Name: {animal.name}
      </Typography>
      <Typography color="primary">
        <PetsIcon fontSize="small" /> species: {animal.species}
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 2, mr: 2 }}
        onClick={() => router.push(`/animal/${animal.id}`)}
      >
        View Details
      </Button>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleDelete}
        sx={{ mt: 2 }}
      >
        Delete
      </Button>
    </Card>
  );
};

export default AnimalCard;
