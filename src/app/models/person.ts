import { Animal } from "./animal";

interface PersonData {
  id: number; // Unique identifier for the person
  firstName: string; // First name of the person
  lastName: string; // Last name of the person
  email: string; // Email address of the person
  phoneNumber: string; // Phone number of the person
  animals?: Animal[]; // Optional array of animals owned by the person
}

export class Person {
  id: number; // Unique identifier for the person
  firstName: string; // First name of the person
  lastName: string; // Last name of the person
  email: string; // Email address of the person
  phoneNumber: string; // Phone number of the person
  animals: Animal[]; // Array of Animal instances owned by the person

  constructor(data: PersonData) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phoneNumber = data.phoneNumber;
    this.email = data.email;
    this.animals = data.animals
      ? data.animals.map((animal) => new Animal(animal))
      : [];
  }
}
