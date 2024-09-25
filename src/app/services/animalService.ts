import axios from "axios";
import { Animal } from "../models/animal";
import { CreateAnimalDto } from "../DTO/CreateAnimal.dto";
import { UpdateAnimalDto } from "../DTO/UpdateAnimal.dto";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const images: { [key: string]: string[] } = {
  cat: [
    "/images/cat/cat1.jpeg",
    "/images/cat/cat2.jpeg",
    "/images/cat/cat3.jpeg",
    "/images/cat/cat4.jpeg",
    "/images/cat/cat5.jpeg",
  ],
  dog: [
    "/images/dog/dog1.jpeg",
    "/images/dog/dog2.jpeg",
    "/images/dog/dog3.jpeg",
    "/images/dog/dog4.jpeg",
    "/images/dog/dog5.jpeg",
  ],
  bird: [
    "/images/bird/bird1.jpeg",
    "/images/bird/bird2.jpeg",
    "/images/bird/bird3.jpeg",
    "/images/bird/bird4.jpeg",
    "/images/bird/bird5.jpeg",
  ],
  hamster: [
    "/images/hamster/hamster1.jpeg",
    "/images/hamster/hamster2.jpeg",
    "/images/hamster/hamster3.jpeg",
    "/images/hamster/hamster4.jpeg",
    "/images/hamster/hamster5.jpeg",
  ],
  turtle: [
    "/images/turtle/turtle1.jpeg",
    "/images/turtle/turtle2.jpeg",
    "/images/turtle/turtle3.jpeg",
    "/images/turtle/turtle4.jpeg",
    "/images/turtle/turtle5.jpeg",
  ],
  rabbit: [
    "/images/rabbit/rabbit1.jpeg",
    "/images/rabbit/rabbit2.jpeg",
    "/images/rabbit/rabbit3.jpeg",
    "/images/rabbit/rabbit4.jpeg",
    "/images/rabbit/rabbit5.jpeg",
  ],
};

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

  //get animals by ownerId
  async getAnimalsByOwnerId(ownerId: number): Promise<Animal[]> {
    const query = `
      query {
        animalsByOwnerId(ownerId: ${ownerId}) {
          id
          name
          species
          weight
          color
          dateOfBirth
          breed
        }
      }
    `;

    const response = await axios.post(`${API_URL}/graphql`, { query });

    return response.data.data.animalsByOwnerId;
  },

  // Create a new animal
  async createAnimal(
    animalData: Omit<CreateAnimalDto, "constructor">
  ): Promise<{ message: string; animal: Animal }> {
    const animalDto = new CreateAnimalDto(animalData);
    try {
      const response = await axios.post(`${API_URL}/animal`, animalDto);
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
    animalData: Partial<Omit<UpdateAnimalDto, "constructor">>
  ): Promise<{ message: string; animal: Animal }> {
    const animalDto = new UpdateAnimalDto(animalData);
    try {
      const response = await axios.put(`${API_URL}/animal/${id}`, animalDto);
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

  getImage(species: string): string {
    const speciesLower = species.toLowerCase();

    const speciesImages = images[speciesLower];
    if (speciesImages) {
      const randomIndex = Math.floor(Math.random() * speciesImages.length);
      return speciesImages[randomIndex];
    }

    return "No images";
  },
};
