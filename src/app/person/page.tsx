import PersonService from "../services/personService";
import PersonList from "./components/personList";

const PersonPage = async () => {
  const persons = await PersonService.getAllPersons();

  return (
    <div>
      <PersonList persons={persons} />{" "}
    </div>
  );
};

export default PersonPage;
