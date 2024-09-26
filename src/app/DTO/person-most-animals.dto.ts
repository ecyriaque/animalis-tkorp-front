export class PersonMostAnimalsDto {
  id: number;

  firstName: string;

  lastName: string;

  animalCount: number;

  constructor(data: Omit<PersonMostAnimalsDto, "constructor">) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.animalCount = data.animalCount;
  }
}
