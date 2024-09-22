import React, { useEffect, useState } from "react";
import { Person } from "../models/person";
import PersonService from "../services/personService"; // Assurez-vous que le chemin est correct

const PersonList: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const data = await PersonService.getAllPersons(); // Appeler la méthode directement sur l'objet
        setPeople(data);
      } catch (err) {
        setError("Failed to fetch people");
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>People List</h1>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            {person.firstName} {person.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonList;
