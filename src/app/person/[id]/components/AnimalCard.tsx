"use client";

import { Card, Typography, Button } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import DeleteIcon from "@mui/icons-material/Delete";
import { AnimalService } from "@/app/services/animalService";
import { useConfirmationDialog } from "@/app/components/ConfirmationDialog";
import { useSnackbar } from "@/app/components/Snackbar";

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
      <Button
        variant="contained"
        sx={{ mt: 2, mr: 2 }}
        onClick={() => console.log("View details for", animal.id)}
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
