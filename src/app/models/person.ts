import { Animal } from "./animal";

interface PersonData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  animals?: Animal[];
}

export class Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  animals: Animal[];

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
