"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Divider,
  CircularProgress,
  Grid,
  Box,
  CardActions,
} from "@mui/material";

import { Animal } from "./models/animal";
import { AnimalService } from "./services/animalService";
import PersonService from "./services/personService";
import { PersonHeaviestAnimalDto } from "./DTO/person-heaviest-animal.dto";
import { PersonHeaviestGroupDto } from "./DTO/person-heaviest-group.dto";
import { PersonMostAnimalsDto } from "./DTO/person-most-animals.dto";

export default function Home() {
  const [oldestAnimal, setOldestAnimal] = useState<Animal>();

  const [popularSpecies, setPopularSpecies] = useState<string | null>(null);

  const [heaviestAnimalPerson, setHeaviestAnimalPerson] =
    useState<PersonHeaviestAnimalDto | null>(null);

  const [heaviestGroupPerson, setHeaviestGroupPerson] =
    useState<PersonHeaviestGroupDto | null>(null);

  const [mostAnimalsPerson, setMostAnimalsPerson] =
    useState<PersonMostAnimalsDto | null>(null);
  const [loading, setLoading] = useState(true);

  const [oldestAnimalAge, setOldestAnimalAge] = useState<{
    years: number;
    months: number;
  } | null>(null);

  // Set loading to false after data fetch
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from services
        const oldest = await AnimalService.getOlderAnimal();
        const popular = await AnimalService.getPopularSpecies();
        const heaviestAnimal =
          await PersonService.getPersonWithHeaviestAnimal();
        const heaviestGroup = await PersonService.getPersonWithHeaviestGroup();
        const mostAnimals = await PersonService.getPersonWithMostAnimals();

        // Set state with fetched data
        setOldestAnimal(oldest);
        setPopularSpecies(popular.species);
        setHeaviestAnimalPerson(heaviestAnimal);
        setHeaviestGroupPerson(heaviestGroup);
        setMostAnimalsPerson(mostAnimals);

        // Calculate age for the oldest animal
        if (oldest) {
          setOldestAnimalAge(calculateAge(oldest.dateOfBirth));
        }
        setLoading(false); // Set loading to false after data fetch
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        style={{ marginTop: "5rem", display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={4} justifyContent="center" sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom align="center">
          Welcome to Animalis!
        </Typography>
        <Typography variant="h6" align="center">
          Discover the wonders of the animal kingdom!
        </Typography>
      </Grid>
      {/* Section for the oldest animal */}
      <Grid item xs={12} md={6}>
        {oldestAnimal && (
          <Card
            elevation={3}
            sx={{
              textAlign: "center",
              padding: 2,
              height: "350px",
              backgroundColor: "#DCDCC6",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Oldest Animal
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Species: {oldestAnimal.species}
              </Typography>
              <CardMedia
                component="img"
                height="140" // Hauteur fixe pour l'image
                image={AnimalService.getImage(
                  oldestAnimal.species,
                  oldestAnimal.id
                )}
                style={{
                  objectFit: "contain",
                  borderRadius: 8,
                }}
              />
              <Typography variant="h6">{oldestAnimal.name}</Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                gutterBottom
                sx={{ fontStyle: "italic", color: "#4CAF50" }}
              >
                I have{" "}
                {oldestAnimalAge && (
                  <>
                    {oldestAnimalAge.years > 0
                      ? `${oldestAnimalAge.years} year${
                          oldestAnimalAge.years > 1 ? "s" : ""
                        }`
                      : `${oldestAnimalAge.months} month${
                          oldestAnimalAge.months > 1 ? "s" : ""
                        }`}{" "}
                    old.
                  </>
                )}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ margin: 1 }}
                href={`/animal/${oldestAnimal.id}`}
              >
                See the Animal
              </Button>
            </CardContent>
          </Card>
        )}
      </Grid>

      {/* Section for the most popular species */}
      <Grid item xs={12} md={6}>
        {popularSpecies && (
          <Card
            elevation={3}
            sx={{
              textAlign: "center",
              padding: 2,
              height: "350px",
              backgroundColor: "#DCDCC6",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Most Popular Species
              </Typography>
              <CardMedia
                component="img"
                height="140" // Hauteur fixe pour l'image
                image={AnimalService.getImage(popularSpecies)}
                style={{
                  objectFit: "contain",
                  borderRadius: 8,
                }}
              />
              <Typography variant="body2">
                This is the most common species in our database.
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>

      <Divider sx={{ width: "100%", margin: "2rem 0" }} />

      {/* Section for the person with the heaviest animal */}
      <Grid item xs={12} md={6}>
        {heaviestAnimalPerson && (
          <Card
            elevation={3}
            sx={{
              textAlign: "center",
              padding: 3,
              borderRadius: 2,
              height: "350px",
              backgroundColor: "#DCDCC6",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Person with the Heaviest Animal
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: 1 }}
              >
                {heaviestAnimalPerson.firstName} {heaviestAnimalPerson.lastName}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 1 }}
              >
                Animal: {heaviestAnimalPerson.animalName}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Weight: {heaviestAnimalPerson.weight} kg
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ margin: 1, borderRadius: 2 }}
                href={`/animal/${heaviestAnimalPerson.animal_id}`}
              >
                See the Animal
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ margin: 1, borderRadius: 2 }}
                href={`/person/${heaviestAnimalPerson.person_id}`}
              >
                See the Owner
              </Button>
            </CardActions>
          </Card>
        )}
      </Grid>

      {/* Section for the person with the heaviest group of animals */}
      <Grid item xs={12} md={6}>
        {heaviestGroupPerson && (
          <Card
            elevation={3}
            sx={{
              textAlign: "center",
              padding: 3,
              height: "350px",
              backgroundColor: "#DCDCC6",

              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Person with the Heaviest Group of Animals
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginBottom: 1 }}
              >
                {heaviestGroupPerson.firstName} {heaviestGroupPerson.lastName}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Total weight: {heaviestGroupPerson.totalWeight} pounds
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ margin: 1, borderRadius: 2, mt: "180px" }}
                href={`/person/${heaviestGroupPerson.id}`}
              >
                See the Owner
              </Button>
            </CardActions>
          </Card>
        )}
      </Grid>

      <Divider sx={{ width: "100%", margin: "2rem 0" }} />

      {/* Section for the person with the most animals */}
      <Grid item xs={12} md={6}>
        {mostAnimalsPerson && (
          <Card
            elevation={3}
            sx={{
              textAlign: "center",
              padding: 3, // Augmenter le padding pour plus d'espace
              height: "350px",
              backgroundColor: "#DCDCC6",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // Pour un espacement approprié
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Person with the Most Animals
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: 1 }}
              >
                {mostAnimalsPerson.firstName} {mostAnimalsPerson.lastName}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Number of animals: {mostAnimalsPerson.animalCount}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ margin: 1, borderRadius: 2 }}
                href={`/person/${mostAnimalsPerson.id}`}
              >
                See the Owner
              </Button>
            </CardActions>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}
