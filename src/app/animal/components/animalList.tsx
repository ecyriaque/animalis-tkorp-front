"use client";

import React, { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Pagination,
  Box,
  Typography,
} from "@mui/material";
import AnimalCard from "@/app/animal/components/AnimalCard";
import { SelectChangeEvent } from "@mui/material/Select";

interface Animal {
  id: number;
  name: string;
  species: string;
  weight: number;
  dateOfBirth: string;
}

interface AnimalListProps {
  animals: Animal[];
}

const AnimalList: React.FC<AnimalListProps> = ({ animals: initialAnimals }) => {
  const [animals, setAnimals] = useState(initialAnimals);
  const [searchTerm, setSearchTerm] = useState(""); // For search bar
  const [selectedSpecies, setSelectedSpecies] = useState(""); // For species filter
  const [sortByDate, setSortByDate] = useState(""); // For sorting by date
  const [sortByWeight, setSortByWeight] = useState(""); // For sorting by weight
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const animalsPerPage = 6;

  // Filter animals based on search bar and species filter
  const filteredAnimals = animals.filter(
    (animal) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSpecies === "" || animal.species === selectedSpecies)
  );

  // Sort animals based on the selected option for date
  const sortedByDate = [...filteredAnimals].sort((a, b) => {
    if (sortByDate === "dateAsc") {
      return (
        new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime()
      );
    } else if (sortByDate === "dateDesc") {
      return (
        new Date(b.dateOfBirth).getTime() - new Date(a.dateOfBirth).getTime()
      );
    }
    return 0;
  });

  // Sort animals based on the selected option for weight
  const sortedByWeight = [...sortedByDate].sort((a, b) => {
    if (sortByWeight === "weightAsc") {
      return a.weight - b.weight;
    } else if (sortByWeight === "weightDesc") {
      return b.weight - a.weight;
    }
    return 0;
  });

  // Calculate total number of pages
  const totalPages = Math.ceil(sortedByWeight.length / animalsPerPage);

  // Get animals for the current page
  const displayedAnimals = sortedByWeight.slice(
    (currentPage - 1) * animalsPerPage,
    currentPage * animalsPerPage
  );

  // Handle search change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Handle species change
  const handleSpeciesChange = (event: SelectChangeEvent<string>) => {
    setSelectedSpecies(event.target.value);
    setCurrentPage(1);
  };

  // Handle sort by date change
  const handleSortByDateChange = (event: SelectChangeEvent<string>) => {
    setSortByDate(event.target.value);
    setCurrentPage(1);
  };

  // Handle sort by weight change
  const handleSortByWeightChange = (event: SelectChangeEvent<string>) => {
    setSortByWeight(event.target.value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(event);
    setCurrentPage(value);
  };

  return (
    <div>
      {/* Container for search bar and filters */}
      <Box display="flex" alignItems="center" mb={3} sx={{ mt: "2%" }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mr: 2, flexBasis: "50%" }}
        />

        {/* Species selector */}
        <FormControl variant="outlined" sx={{ mr: 2, flexBasis: "15%" }}>
          <InputLabel id="species-select-label">Species</InputLabel>
          <Select
            labelId="species-select-label"
            value={selectedSpecies}
            onChange={handleSpeciesChange}
            label="Species"
          >
            <MenuItem value="">All Species</MenuItem>
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
            <MenuItem value="Bird">Bird</MenuItem>
            <MenuItem value="Hamster">Hamster</MenuItem>
            <MenuItem value="Turtle">Turtle</MenuItem>
            <MenuItem value="Rabbit">Rabbit</MenuItem>
          </Select>
        </FormControl>

        {/* Sort by date selector */}
        <FormControl variant="outlined" sx={{ mr: 2, flexBasis: "15%" }}>
          <InputLabel id="sort-date-select-label">Sort by Date</InputLabel>
          <Select
            labelId="sort-date-select-label"
            value={sortByDate}
            onChange={handleSortByDateChange}
            label="Sort by Date"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="dateAsc">Oldest First</MenuItem>
            <MenuItem value="dateDesc">Newest First</MenuItem>
          </Select>
        </FormControl>

        {/* Sort by weight selector */}
        <FormControl variant="outlined" sx={{ mr: 2, flexBasis: "15%" }}>
          <InputLabel id="sort-weight-select-label">Sort by Weight</InputLabel>
          <Select
            labelId="sort-weight-select-label"
            value={sortByWeight}
            onChange={handleSortByWeightChange}
            label="Sort by Weight"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="weightAsc">Ascending</MenuItem>
            <MenuItem value="weightDesc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Animal list */}
      <Grid container spacing={4}>
        {displayedAnimals.length > 0 ? (
          displayedAnimals.map((animal) => (
            <Grid item xs={12} sm={6} md={4} key={animal.id}>
              <AnimalCard
                animal={animal}
                onDelete={(id) =>
                  setAnimals((prev) =>
                    prev.filter((animal) => animal.id !== id)
                  )
                }
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ width: "100%", textAlign: "center" }}>
            No animals found
          </Typography>
        )}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
        />
      )}
    </div>
  );
};

export default AnimalList;
