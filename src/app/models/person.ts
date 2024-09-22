import { Animal } from "./animal";

export class Person {
  id: number;
  firstName: string;
  lastName: string;
  animals: Animal[];

  constructor(data: any) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.animals = data.animals
      ? data.animals.map((animal: any) => new Animal(animal))
      : [];
  }
}
