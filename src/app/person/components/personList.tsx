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
  Pagination,
} from "@mui/material";
import { useRouter } from "next/navigation";
import CreatePersonModal from "./CreatePersonModal";
import { SelectChangeEvent } from "@mui/material/Select";
interface Person {
  id: number;
  firstName: string;
  lastName: string;
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
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value as string);
  };

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

  const totalPages = Math.ceil(filteredPersons.length / itemsPerPage);
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
          }}
          onClick={() => router.push(`/person/${person.id}`)}
        >
          <CardMedia
            component="img"
            height="140"
            image="/images/person.jpeg"
            alt={`${person.firstName} ${person.lastName}`}
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
    <div style={{ padding: "20px" }}>
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
          Add a Owner
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
      <CreatePersonModal open={modalOpen} onClose={() => setModalOpen(false)} />{" "}
      {/* Intégration du modal */}
    </div>
  );
}
