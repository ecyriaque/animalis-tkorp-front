"use client";

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
        const data = await PersonService.getPersonById(1); // Appeler la méthode directement sur l'objet
        console.log(data);
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

  return <div></div>;
};

export default PersonList;
