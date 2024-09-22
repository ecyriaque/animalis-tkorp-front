import axios from "axios";
import { Person } from "../models/person";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PersonService = {
  // Fetch all persons from the API
  async getAllPersons(): Promise<Person[]> {
    try {
      const response = await axios.get(`${API_URL}/person`);
      return response.data;
    } catch (error) {
      console.error("Error fetching persons:", error);
      throw error;
    }
  },

  // Fetch a specific person by ID from the API
  async getPersonById(id: number): Promise<Person> {
    try {
      const response = await axios.get(`${API_URL}/person/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching person with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new person in the API
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

  // Update an existing person by ID in the API
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

  // Delete a person by ID from the API
  async deletePerson(id: number): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`${API_URL}/person/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting person with ID ${id}:`, error);
      throw error;
    }
  },
};

export default PersonService;
