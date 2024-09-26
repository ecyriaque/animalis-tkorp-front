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
    "/images/cat/cat6.jpeg",
    "/images/cat/cat7.jpeg",
    "/images/cat/cat8.jpeg",
    "/images/cat/cat9.jpeg",
    "/images/cat/cat10.jpeg",
  ],
  dog: [
    "/images/dog/dog1.jpeg",
    "/images/dog/dog2.jpeg",
    "/images/dog/dog3.jpeg",
    "/images/dog/dog4.jpeg",
    "/images/dog/dog5.jpeg",
    "/images/dog/dog6.jpeg",
    "/images/dog/dog7.jpeg",
    "/images/dog/dog8.jpeg",
    "/images/dog/dog9.jpeg",
    "/images/dog/dog10.jpeg",
  ],
  bird: [
    "/images/bird/bird1.jpeg",
    "/images/bird/bird2.jpeg",
    "/images/bird/bird3.jpeg",
    "/images/bird/bird4.jpeg",
    "/images/bird/bird5.jpeg",
    "/images/bird/bird6.jpeg",
    "/images/bird/bird7.jpeg",
    "/images/bird/bird8.jpeg",
    "/images/bird/bird9.jpeg",
    "/images/bird/bird10.jpeg",
  ],
  hamster: [
    "/images/hamster/hamster1.jpeg",
    "/images/hamster/hamster2.jpeg",
    "/images/hamster/hamster3.jpeg",
    "/images/hamster/hamster4.jpeg",
    "/images/hamster/hamster5.jpeg",
    "/images/hamster/hamster6.jpeg",
    "/images/hamster/hamster7.jpeg",
    "/images/hamster/hamster8.jpeg",
    "/images/hamster/hamster9.jpeg",
    "/images/hamster/hamster10.jpeg",
  ],
  turtle: [
    "/images/turtle/turtle1.jpeg",
    "/images/turtle/turtle2.jpeg",
    "/images/turtle/turtle3.jpeg",
    "/images/turtle/turtle4.jpeg",
    "/images/turtle/turtle5.jpeg",
    "/images/turtle/turtle6.jpeg",
    "/images/turtle/turtle7.jpeg",
    "/images/turtle/turtle8.jpeg",
    "/images/turtle/turtle9.jpeg",
    "/images/turtle/turtle10.jpeg",
  ],
  rabbit: [
    "/images/rabbit/rabbit1.jpeg",
    "/images/rabbit/rabbit2.jpeg",
    "/images/rabbit/rabbit3.jpeg",
    "/images/rabbit/rabbit4.jpeg",
    "/images/rabbit/rabbit5.jpeg",
    "/images/rabbit/rabbit6.jpeg",
    "/images/rabbit/rabbit7.jpeg",
    "/images/rabbit/rabbit8.jpeg",
    "/images/rabbit/rabbit9.jpeg",
    "/images/rabbit/rabbit10.jpeg",
  ],
};

export const AnimalService = {
  // get all animals
  async getAllAnimals(): Promise<Animal[]> {
    try {
      const response = await axios.get(`${API_URL}/animal`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all animals:", error);
      throw error;
    }
  },

  // get a specific animal by ID
  async getAnimalById(id: number): Promise<Animal> {
    try {
      const response = await axios.get(`${API_URL}/animal/${id}`);
      return response.data;
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
      console.log("répond", response);
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

  getImage(species: string, animalId?: number): string {
    const speciesLower = species.toLowerCase();
    const speciesImages = images[speciesLower];

    if (speciesImages) {
      if (animalId !== undefined) {
        const lastDigit = animalId % 10;
        let imageIndex = lastDigit - 1;

        // Si l'animalId est 0, on met l'image à l'index 0
        if (animalId === 0 || imageIndex < 0) {
          imageIndex = 0;
        }

        if (imageIndex >= 0 && imageIndex < speciesImages.length) {
          return speciesImages[imageIndex];
        }
      } else {
        const randomIndex = Math.floor(Math.random() * speciesImages.length);
        return speciesImages[randomIndex];
      }
    }

    return "No images";
  },
};
