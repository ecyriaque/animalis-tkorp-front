"use client";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import { ProgressSpinner } from "primereact/progressspinner"; // Import du spinner

import { Animal } from "./models/animal";
import { AnimalService } from "./services/animalService";
import PersonService from "./services/personService";

export default function Home() {
  const [oldestAnimal, setOldestAnimal] = useState<Animal | null>(null);
  const [popularSpecies, setPopularSpecies] = useState<string | null>(null);
  const [heaviestAnimalPerson, setHeaviestAnimalPerson] = useState<any | null>(
    null
  );
  const [heaviestGroupPerson, setHeaviestGroupPerson] = useState<any | null>(
    null
  );
  const [mostAnimalsPerson, setMostAnimalsPerson] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // État pour suivre le chargement

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
      <div className="p-grid p-justify-center" style={{ marginTop: "5rem" }}>
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div className="p-grid p-justify-center" style={{ gap: "2rem" }}>
      {/* Section for the oldest animal */}
      <div className="p-col-12 p-md-6">
        {oldestAnimal && (
          <Card
            title="Oldest Animal"
            className="p-shadow-3"
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            <Tag
              value={`${oldestAnimal.species}`}
              severity="info"
              style={{ marginBottom: "1rem" }}
            />

            <h3>{oldestAnimal.name}</h3>

            <img
              src={AnimalService.getAnimalImageUrl(oldestAnimal.species)}
              alt={oldestAnimal.species}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "50%",
                marginBottom: "1rem",
              }}
            />
            <p style={{ marginTop: "1rem" }}>
              Date of birth:{" "}
              {new Date(oldestAnimal.dateOfBirth).toLocaleDateString("en-US")}
            </p>
            <Button
              label="Details"
              icon="pi pi-info"
              className="p-button-rounded p-button-outlined p-mt-2"
            />
          </Card>
        )}
      </div>

      {/* Section for the most popular species */}
      <div className="p-col-12 p-md-6">
        {popularSpecies && (
          <Card
            title="Most Popular Species"
            subTitle={popularSpecies}
            className="p-shadow-3"
            style={{ textAlign: "center" }}
          >
            <img
              src={AnimalService.getAnimalImageUrl(popularSpecies)}
              alt={popularSpecies}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "50%",
                marginBottom: "1rem",
              }}
            />
            <p>This is the most common species in our database.</p>
          </Card>
        )}
      </div>

      <Divider />

      {/* Section for the person with the heaviest animal */}
      <div className="p-col-12 p-md-6">
        {heaviestAnimalPerson && (
          <Card
            title="Person with the Heaviest Animal"
            subTitle={`${heaviestAnimalPerson.firstName} ${heaviestAnimalPerson.lastName}`}
            className="p-shadow-3"
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            <p>
              Animal: {heaviestAnimalPerson.animalName}, Weight:{" "}
              {heaviestAnimalPerson.weight} kg
            </p>
          </Card>
        )}
      </div>

      {/* Section for the person with the heaviest group of animals */}
      <div className="p-col-12 p-md-6">
        {heaviestGroupPerson && (
          <Card
            title="Person with the Heaviest Group of Animals"
            subTitle={`${heaviestGroupPerson.firstName} ${heaviestGroupPerson.lastName}`}
            className="p-shadow-3"
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            <p>Total weight: {heaviestGroupPerson.totalWeight} kg</p>
          </Card>
        )}
      </div>

      <Divider />

      {/* Section for the person with the most animals */}
      <div className="p-col-12 p-md-6">
        {mostAnimalsPerson && (
          <Card
            title="Person with the Most Animals"
            subTitle={`${mostAnimalsPerson.firstName} ${mostAnimalsPerson.lastName}`}
            className="p-shadow-3"
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            <p>Number of animals: {mostAnimalsPerson.animalCount}</p>
          </Card>
        )}
      </div>
    </div>
  );
}
