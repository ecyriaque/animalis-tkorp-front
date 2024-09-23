"use client";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import { Animal } from "./models/animal";
import { AnimalService } from "./services/animalService";

export default function Home() {
  const [oldestAnimal, setOldestAnimal] = useState<Animal | null>(null);
  const [popularSpecies, setPopularSpecies] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const oldest = await AnimalService.getOlderAnimal();

        const popular = await AnimalService.getPopularSpecies();
        setOldestAnimal(oldest);
        setPopularSpecies(popular.species);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-grid">
      <div className="p-col-12">
        {oldestAnimal ? (
          <Card title="Oldest Animal" subTitle={oldestAnimal.name}>
            <img
              src={AnimalService.getAnimalImageUrl(oldestAnimal.species)}
              alt={oldestAnimal.species}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <p>
              Date of Birth:{" "}
              {new Date(oldestAnimal.dateOfBirth).toLocaleDateString()}
            </p>
            <Button label="Details" icon="pi pi-info" />
          </Card>
        ) : (
          <p>Loading oldest animal...</p>
        )}
      </div>

      <div className="p-col-12">
        <Card title="Most Popular Species" subTitle={popularSpecies}>
          <p>This is the most common species in our records.</p>
        </Card>
      </div>
    </div>
  );
}
