export class Animal {
  id: number; // Unique identifier for the animal
  name: string; // Name of the animal
  species: string; // Species of the animal (e.g., dog, cat)
  color: string; // Color of the animal
  breed: string; // Breed of the animal
  dateOfBirth: string; // Date of birth in string format
  ownerId: number; // Identifier of the animal's owner
  weight: number; // Weight of the animal

  constructor(data: Animal) {
    this.id = data.id;
    this.name = data.name;
    this.color = data.color;
    this.breed = data.breed;
    this.dateOfBirth = new Date(data.dateOfBirth).toDateString();
    this.weight = data.weight;
    this.species = data.species;
    this.ownerId = data.ownerId;
  }
}
