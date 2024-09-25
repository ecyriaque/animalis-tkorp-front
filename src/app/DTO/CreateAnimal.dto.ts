export class CreateAnimalDto {
  name: string;
  species: string;
  weight: number;
  color: string;
  dateOfBirth: Date;
  breed: string;

  constructor(data: Omit<CreateAnimalDto, "constructor">) {
    this.name = data.name;
    this.species = data.species;
    this.weight = data.weight;
    this.color = data.color;
    this.dateOfBirth = data.dateOfBirth;
    this.breed = data.breed;
  }
}
