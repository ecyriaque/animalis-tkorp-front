export class Animal {
  id: number;
  name: string;
  species: string;
  color: string;
  breed: string;
  dateOfBirth: Date;
  ownerId: number;
  weight: number;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.color = data.color;
    this.breed = data.breed;
    this.dateOfBirth = data.dateOfBirth;
    this.weight = data.weight;
    this.species = data.species;
    this.ownerId = data.ownerId || data.owner.id;
  }
}
