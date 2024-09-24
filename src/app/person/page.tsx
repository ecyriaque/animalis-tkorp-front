// src/app/person/page.tsx
import PersonService from "../services/personService";
import PersonList from "./components/personList";

const PersonPage = async () => {
  // Récupérer les données sur le serveur
  const persons = await PersonService.getAllPersons();

  return (
    <div>
      <PersonList persons={persons} />{" "}
    </div>
  );
};

export default PersonPage;
