import axios from "axios";
import { Person } from "../models/person";
import { PersonHeaviestGroupDto } from "../DTO/person-heaviest-group.dto";
import { PersonHeaviestAnimalDto } from "../DTO/person-heaviest-animal.dto";
import { PersonMostAnimalsDto } from "../DTO/person-most-animals.dto";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const personImages: string[] = [
  "/images/person/person1.jpeg",
  "/images/person/person2.jpeg",
  "/images/person/person3.jpeg",
  "/images/person/person4.jpeg",
  "/images/person/person5.jpeg",
  "/images/person/person6.jpeg",
  "/images/person/person7.jpeg",
  "/images/person/person8.jpeg",
  "/images/person/person9.jpeg",
  "/images/person/person10.jpeg",
];

const PersonService = {
  // get all persons from the API
  async getAllPersons(): Promise<Person[]> {
    try {
      const response = await axios.get(`${API_URL}/person`);
      return response.data;
    } catch (error) {
      console.error("Error fetching persons:", error);
      throw error;
    }
  },

  // get a specific person by ID from the API
  async getPersonById(id: number): Promise<Person> {
    try {
      const response = await axios.get(`${API_URL}/person/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching person with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new person
  async createPerson(
    personData: Partial<Person>
  ): Promise<{ message: string; person: Person }> {
    try {
      const response = await axios.post(`${API_URL}/person`, personData);
      return response.data;
    } catch (error) {
      console.error("Error creating person:", error);
      throw error;
    }
  },

  // Update an existing person by ID
  async updatePerson(
    id: number,
    personData: Partial<Person>
  ): Promise<{ message: string; person: Person }> {
    try {
      const response = await axios.put(`${API_URL}/person/${id}`, personData);
      return response.data;
    } catch (error) {
      console.error(`Error updating person with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a person by ID
  async deletePerson(id: number): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`${API_URL}/person/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting person with ID ${id}:`, error);
      throw error;
    }
  },

  async getPersonWithHeaviestAnimal(): Promise<PersonHeaviestAnimalDto> {
    const query = `
      query {
        heaviestAnimal {
          person_id
          firstName
          lastName
          animal_id
          animalName
          weight
        }
      }
    `;

    try {
      const response = await axios.post(`${API_URL}/graphql`, { query });
      return response.data.data.heaviestAnimal;
    } catch (error) {
      console.error(
        "Error fetching the person with the heaviest animal:",
        error
      );
      throw error;
    }
  },

  // get the person with the heaviest group of animals
  async getPersonWithHeaviestGroup(): Promise<PersonHeaviestGroupDto> {
    const query = `
      query {
        heaviestGroup {
          id
          firstName
          lastName
          totalWeight
        }
      }
    `;

    try {
      const response = await axios.post(`${API_URL}/graphql`, { query });
      return response.data.data.heaviestGroup;
    } catch (error) {
      console.error(
        "Error fetching the person with the heaviest group of animals:",
        error
      );
      throw error;
    }
  },

  // get the person with the most animals
  async getPersonWithMostAnimals(): Promise<PersonMostAnimalsDto> {
    const query = `
    query {
      mostAnimals {
        id
        firstName
        lastName
        animalCount
      }
    }
  `;

    try {
      const response = await axios.post(`${API_URL}/graphql`, { query });
      return response.data.data.mostAnimals;
    } catch (error) {
      console.error("Error fetching the person with the most animals:", error);
      throw error;
    }
  },

  // get the person with the most animals by species
  async getPersonWithMostAnimalsBySpecies(
    species: string
  ): Promise<PersonMostAnimalsDto> {
    const query = `
      query($species: String!) {
        mostAnimalsBySpecies(species: $species) {
          id
          firstName
          lastName
          animalCount
        }
      }
    `;

    try {
      const response = await axios.post(`${API_URL}/graphql`, {
        query,
        variables: { species },
      });
      return response.data.data.mostAnimalsBySpecies;
    } catch (error) {
      console.error(
        `Error fetching the person with the most animals by species ${species}:`,
        error
      );
      throw error;
    }
  },
  getPersonImage(personId?: number): string {
    if (personId !== undefined) {
      const lastDigit = personId % 10;
      let imageIndex = lastDigit - 1;

      // Si personId est 0 ou l'index est inférieur à 0, on met l'image à l'index 0
      if (personId === 0 || imageIndex < 0) {
        imageIndex = 0;
      }

      if (imageIndex >= 0 && imageIndex < personImages.length) {
        return personImages[imageIndex];
      }
    }

    // Si pas de personId ou si en dehors de la limite, on prend une image aléatoire
    const randomIndex = Math.floor(Math.random() * personImages.length);
    return personImages[randomIndex];
  },
};

export default PersonService;
