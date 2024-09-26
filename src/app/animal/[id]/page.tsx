import { AnimalService } from "@/app/services/animalService";
import PersonService from "@/app/services/personService";
import NotFound from "./components/NotFound";
import AnimalDetail from "./components/AnimalDetail";

const AnimalDetailPage = async ({ params }: { params: { id: string } }) => {
  let animalData;

  try {
    animalData = await AnimalService.getAnimalById(+params.id);
  } catch (error) {
    console.error(error);
    return <NotFound />;
  }

  if (!animalData) {
    return <NotFound />;
  }

  const owner = await PersonService.getPersonById(animalData.ownerId);

  return <AnimalDetail animal={animalData} owner={owner} />;
};

export default AnimalDetailPage;
