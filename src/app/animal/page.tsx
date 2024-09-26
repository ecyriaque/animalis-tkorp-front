// src/app/animal/page.tsx
import { AnimalService } from "../services/animalService";
import AnimalList from "./components/animalList";

const AnimalPage = async () => {
  const animals = await AnimalService.getAllAnimals();

  return (
    <div>
      <AnimalList animals={animals} />
    </div>
  );
};

export default AnimalPage;
