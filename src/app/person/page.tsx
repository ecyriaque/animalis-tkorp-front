import PersonService from "../services/personService";
import PersonList from "./components/personList";
const PersonPage = async () => {
  // Fetching all persons from the PersonService
  const persons = await PersonService.getAllPersons();

  return (
    <div>
      <PersonList persons={persons} />
    </div>
  );
};

export default PersonPage;
