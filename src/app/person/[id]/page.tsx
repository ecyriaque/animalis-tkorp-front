import { AnimalService } from "@/app/services/animalService";
import PersonService from "../../services/personService";
import PersonDetailClient from "./components/PersonDetailClient";
import NotFound from "./components/NotFound";

const PersonDetailPage = async ({ params }: { params: { id: string } }) => {
  let personData;

  try {
    personData = await PersonService.getPersonById(+params.id);
  } catch (error) {
    console.error(error);
    return <NotFound />;
  }

  if (!personData) {
    return <NotFound />;
  }

  const animals = await AnimalService.getAnimalsByOwnerId(personData.id);
  personData.animals = animals;

  return <PersonDetailClient person={personData} />;
};

export default PersonDetailPage;
