// src/app/animal/page.tsx
import { AnimalService } from "../services/animalService";
import AnimalList from "./components/animalList";

// This page component fetches and displays a list of animals
const AnimalPage = async () => {
  const animals = await AnimalService.getAllAnimals();

  return (
    <div>
      <AnimalList animals={animals} />
    </div>
  );
};

export default AnimalPage;
