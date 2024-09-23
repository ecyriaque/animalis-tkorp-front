import axios from "axios";
import { Animal } from "../models/animal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AnimalService = {
  // get all animals
  async getAllAnimals(): Promise<Animal[]> {
    try {
      const response = await axios.get(`${API_URL}/animal`);
      return response.data.map((item: any) => new Animal(item));
    } catch (error) {
      console.error("Error fetching all animals:", error);
      throw error;
    }
  },

  // get a specific animal by ID
  async getAnimalById(id: number): Promise<Animal> {
    try {
      const response = await axios.get(`${API_URL}/animal/${id}`);
      return new Animal(response.data);
    } catch (error) {
      console.error(`Error fetching animal with ID ${id}:`, error);
      throw error;
    }
  },

  // get the oldest animal using GraphQL
  async getOlderAnimal(): Promise<Animal> {
    const query = `
    query {
      oldestAnimal {
        id
        name
        dateOfBirth
        species
        weight
        color
        breed
        owner {
                id
                firstName
                lastName
              }
      }
    }
  `;

    try {
      const response = await axios.post(`${API_URL}/graphql`, { query });
      console.log(response);
      return new Animal(response.data.data.oldestAnimal);
    } catch (error) {
      console.error("Error fetching the oldest animal:", error);
      throw error;
    }
  },

  // get the most popular animal species using GraphQL
  async getPopularSpecies(): Promise<{ species: string }> {
    const query = `
    query {
      popularSpecies
    }
  `;

    try {
      const response = await axios.post(`${API_URL}/graphql`, { query });
      return { species: response.data.data.popularSpecies };
    } catch (error) {
      console.error("Error fetching the popular species:", error);
      throw error;
    }
  },

  // Create a new animal
  async createAnimal(
    animal: Animal
  ): Promise<{ message: string; animal: Animal }> {
    try {
      const response = await axios.post(`${API_URL}/animal`, animal);
      return {
        message: response.data.message,
        animal: new Animal(response.data.animal),
      };
    } catch (error) {
      console.error("Error creating animal:", error);
      throw error;
    }
  },

  // Update an existing animal by ID
  async updateAnimal(
    id: number,
    animal: Animal
  ): Promise<{ message: string; animal: Animal }> {
    try {
      const response = await axios.put(`${API_URL}/animal/${id}`, animal);
      return {
        message: response.data.message,
        animal: new Animal(response.data.animal),
      };
    } catch (error) {
      console.error(`Error updating animal with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete an animal by ID
  async deleteAnimal(id: number): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`${API_URL}/animal/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting animal with ID ${id}:`, error);
      throw error;
    }
  },
};
