export class PersonHeaviestAnimalDto {
  person_id: number;

  firstName: string;

  lastName: string;

  animal_id: number;

  animalName: string;

  weight: number;

  constructor(data: Omit<PersonHeaviestAnimalDto, "constructor">) {
    this.person_id = data.person_id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.animal_id = data.animal_id;
    this.animalName = data.animalName;
    this.weight = data.weight;
  }
}
