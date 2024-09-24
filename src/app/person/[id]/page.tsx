import { AnimalService } from "@/app/services/animalService";
import PersonService from "../../services/personService";
import PersonDetailClient from "./components/PersonDetailClient";

const PersonDetailPage = async ({ params }: { params: { id: string } }) => {
  const person = await PersonService.getPersonById(+params.id);
  const animals = await AnimalService.getAnimalsByOwnerId(person.id);

  if (!person) {
    return <div>Person not found</div>;
  }

  return <PersonDetailClient person={person} animals={animals} />;
};

export default PersonDetailPage;
