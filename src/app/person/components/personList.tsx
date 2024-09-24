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
  AppBar,
  Toolbar,
  Pagination, // Importing Pagination component
} from "@mui/material";
import { useRouter } from "next/navigation";

interface Person {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
}

interface PersonListProps {
  persons: Person[];
}

export default function PersonList({ persons = [] }: PersonListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const router = useRouter();
  // Handle changes in the search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset page to 1 when searching
  };

  // Handle changes in the sort order
  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortOrder(event.target.value as string);
  };

  // Filter and sort persons based on search term and sort order
  const filteredPersons = persons
    .filter(
      (person) =>
        person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const comparison = `${a.firstName} ${a.lastName}`.localeCompare(
        `${b.firstName} ${b.lastName}`
      );
      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredPersons.length / itemsPerPage);

  // Get persons to display for the current page
  const paginatedPersons = filteredPersons.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Render individual person card
  const renderPerson = (person: Person) => {
    return (
      <Grid item key={person.id} xs={12} sm={6} md={4} lg={3}>
        <Card
          style={{
            cursor: "grab",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            },
          }}
          onClick={() => router.push(`/person/${person.id}`)}
        >
          <CardMedia
            component="img"
            height="140"
            image="data:image/jpeg;base64,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"
            alt={`${person.firstName} ${person.lastName}`}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {`${person.firstName} ${person.lastName}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <AppBar position="static">
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
      </AppBar>
      <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
        List of Owners
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
    </div>
  );
}
