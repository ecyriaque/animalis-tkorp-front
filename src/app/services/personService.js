import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "localhost:3000";

const PersonService = {
  async getAllPersons() {
    try {
      const response = await axios.get(`${API_URL}/person`);
      return response.data;
    } catch (error) {
      console.error("Error fetching persons:", error);
      throw error;
    }
  },

  async getPersonById(id) {
    try {
      const response = await axios.get(`${API_URL}/person/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching person with ID ${id}:`, error);
      throw error;
    }
  },

  async createPerson(personData) {
    try {
      const response = await axios.post(`${API_URL}/person`, personData);
      return response.data;
    } catch (error) {
      console.error("Error creating person:", error);
      throw error;
    }
  },

  async updatePerson(id, personData) {
    try {
      const response = await axios.put(`${API_URL}/person/${id}`, personData);
      return response.data;
    } catch (error) {
      console.error(`Error updating person with ID ${id}:`, error);
      throw error;
    }
  },

  async deletePerson(id) {
    try {
      const response = await axios.delete(`${API_URL}/person/${id}`);
      return response.data; // Retourne le message de succès de la suppression
    } catch (error) {
      console.error(`Error deleting person with ID ${id}:`, error);
      throw error;
    }
  },
};

export default PersonService;
