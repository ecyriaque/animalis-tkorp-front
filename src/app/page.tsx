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
} from "@mui/material";

import { Animal } from "./models/animal";
import { AnimalService } from "./services/animalService";
import PersonService from "./services/personService";

export default function Home() {
  interface Person {
    firstName: string;
    lastName: string;
    animalName?: string;
    weight?: number;
    totalWeight?: number;
    animalCount?: number;
  }

  const [oldestAnimal, setOldestAnimal] = useState<Animal | null>(null);
  const [popularSpecies, setPopularSpecies] = useState<string | null>(null);
  const [heaviestAnimalPerson, setHeaviestAnimalPerson] =
    useState<Person | null>(null);
  const [heaviestGroupPerson, setHeaviestGroupPerson] = useState<Person | null>(
    null
  );
  const [mostAnimalsPerson, setMostAnimalsPerson] = useState<Person | null>(
    null
  );
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const oldest = await AnimalService.getOlderAnimal();
        const popular = await AnimalService.getPopularSpecies();
        const heaviestAnimal =
          await PersonService.getPersonWithHeaviestAnimal();
        const heaviestGroup = await PersonService.getPersonWithHeaviestGroup();
        const mostAnimals = await PersonService.getPersonWithMostAnimals();

        setOldestAnimal(oldest);
        setPopularSpecies(popular.species);
        setHeaviestAnimalPerson(heaviestAnimal);
        setHeaviestGroupPerson(heaviestGroup);
        setMostAnimalsPerson(mostAnimals);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        style={{ marginTop: "5rem", display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Grid container spacing={4} justifyContent="center">
      {/* Section for the oldest animal */}
      <Grid item xs={12} md={6}>
        {oldestAnimal && (
          <Card
            elevation={3}
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            <CardContent>
              <Typography variant="h5">Oldest Animal</Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginBottom: "1rem" }}
              >
                {oldestAnimal.species}
              </Typography>
              <CardMedia
                component="img"
                height="100"
                image={AnimalService.getImage(oldestAnimal.species)}
                alt={oldestAnimal.species}
                style={{
                  borderRadius: "50%",
                  marginBottom: "1rem",
                }}
              />
              <Typography variant="h6">{oldestAnimal.name}</Typography>
              <Typography style={{ marginTop: "1rem" }}>
                Date of birth:{" "}
                {new Date(oldestAnimal.dateOfBirth).toLocaleDateString("en-US")}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginTop: "1rem" }}
              >
                Details
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
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            <CardContent>
              <Typography variant="h5">Most Popular Species</Typography>
              <CardMedia
                component="img"
                height="100"
                image={AnimalService.getImage(popularSpecies)}
                alt={popularSpecies}
                style={{
                  borderRadius: "50%",
                  marginBottom: "1rem",
                }}
              />
              <Typography variant="body2">
                This is the most common species in our database.
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>

      <Divider style={{ width: "100%", margin: "2rem 0" }} />

      {/* Section for the person with the heaviest animal */}
      <Grid item xs={12} md={6}>
        {heaviestAnimalPerson && (
          <Card
            elevation={3}
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            <CardContent>
              <Typography variant="h5">
                Person with the Heaviest Animal
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {heaviestAnimalPerson.firstName} {heaviestAnimalPerson.lastName}
              </Typography>
              <Typography>
                Animal: {heaviestAnimalPerson.animalName}, Weight:{" "}
                {heaviestAnimalPerson.weight} kg
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>

      {/* Section for the person with the heaviest group of animals */}
      <Grid item xs={12} md={6}>
        {heaviestGroupPerson && (
          <Card
            elevation={3}
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            <CardContent>
              <Typography variant="h5">
                Person with the Heaviest Group of Animals
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {heaviestGroupPerson.firstName} {heaviestGroupPerson.lastName}
              </Typography>
              <Typography>
                Total weight: {heaviestGroupPerson.totalWeight} kg
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>

      <Divider style={{ width: "100%", margin: "2rem 0" }} />

      {/* Section for the person with the most animals */}
      <Grid item xs={12} md={6}>
        {mostAnimalsPerson && (
          <Card
            elevation={3}
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            <CardContent>
              <Typography variant="h5">Person with the Most Animals</Typography>
              <Typography variant="body2" color="textSecondary">
                {mostAnimalsPerson.firstName} {mostAnimalsPerson.lastName}
              </Typography>
              <Typography>
                Number of animals: {mostAnimalsPerson.animalCount}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}
