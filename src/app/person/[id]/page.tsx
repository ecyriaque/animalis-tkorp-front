import { AnimalService } from "@/app/services/animalService";
import PersonService from "../../services/personService";
import PersonDetail from "./components/PersonDetail";
import NotFound from "./components/NotFound";

// Main component for the person detail page
const PersonDetailPage = async ({ params }: { params: { id: string } }) => {
  let personData;

  try {
    personData = await PersonService.getPersonById(+params.id);
  } catch (error) {
    console.error(error);
    return <NotFound />;
  }

  // Return NotFound component if no person data is found
  if (!personData) {
    return <NotFound />;
  }

  // Fetch animals associated with the owner
  const animals = await AnimalService.getAnimalsByOwnerId(personData.id);
  personData.animals = animals;

  return <PersonDetail person={personData} />;
};

export default PersonDetailPage; // Export the component for use in other parts of the application
