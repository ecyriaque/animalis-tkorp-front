"use client";
import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Toolbar,
  Pagination,
} from "@mui/material";
import { useRouter } from "next/navigation";
import CreatePersonModal from "./CreatePersonModal";
import { SelectChangeEvent } from "@mui/material/Select";
import PersonService from "@/app/services/personService";

interface Person {
  id: number;
  firstName: string;
  lastName: string;
}

interface PersonListProps {
  persons: Person[];
}

export default function PersonList({ persons = [] }: PersonListProps) {
  // State for managing the search term input by the user
  const [searchTerm, setSearchTerm] = useState("");

  // State for managing the current sort order (ascending or descending)
  const [sortOrder, setSortOrder] = useState("asc");

  // State for managing the current page of persons displayed
  const [page, setPage] = useState(1);

  // Number of items to display per page
  const itemsPerPage = 8;

  // Router instance for navigation
  const router = useRouter();

  // State for managing the visibility of the modal for adding a person
  const [modalOpen, setModalOpen] = useState(false);

  // Handler for updating the search term based on user input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  // Handler for updating the sort order based on user selection
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value as string);
  };

  // Filter persons based on the search term and sort them
  const filteredPersons = persons
    .filter((person) => {
      const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
      const searchWords = searchTerm.toLowerCase().trim().split(/\s+/);

      return searchWords.every((word) => fullName.includes(word));
    })
    .sort((a, b) => {
      const comparison = `${a.firstName} ${a.lastName}`.localeCompare(
        `${b.firstName} ${b.lastName}`
      );
      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Calculate total pages based on filtered persons and items per page
  const totalPages = Math.ceil(filteredPersons.length / itemsPerPage);

  // Paginate filtered persons for display
  const paginatedPersons = filteredPersons.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const renderPerson = (person: Person) => {
    return (
      <Grid item key={person.id} xs={12} sm={6} md={4} lg={3}>
        <Card
          sx={{
            cursor: "grab",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            },
            background: "#DCDCC6",
            height: { xs: "auto", md: 300, lg: 300, xl: 400 },
          }}
          onClick={() => router.push(`/person/${person.id}`)}
        >
          <CardMedia
            component="img"
            height="250"
            src={PersonService.getPersonImage(person.id)}
            alt={`${person.firstName} ${person.lastName}`}
            sx={{
              mt: 1,
              mb: 0,
              objectFit: "contain", // Assure que l'image entière est visible
            }}
          />
          <CardContent sx={{ background: "#DCDCC6" }}>
            <Typography variant="h6" component="div">
              {`${person.firstName} ${person.lastName}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <div style={{ padding: "20px", minHeight: "100vh" }}>
      <Toolbar>
        <TextField
          label="Search"
          variant="outlined"
          onChange={handleSearchChange}
          style={{ marginRight: "20px", flexGrow: 1 }}
        />
        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel>Order</InputLabel>
          <Select value={sortOrder} onChange={handleSortChange} label="Order">
            <MenuItem value="asc">A-Z</MenuItem>
            <MenuItem value="desc">Z-A</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
      <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
        List of Owners{" "}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
          style={{ marginLeft: "20px" }}
        >
          Add an Owner
        </Button>
      </Typography>
      <Grid container spacing={2}>
        {paginatedPersons.map(renderPerson)}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
        color="primary"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
      <CreatePersonModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
