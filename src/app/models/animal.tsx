export class Animal {
  id: number;
  name: string;
  species: string;
  ownerId: number;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.species = data.species;
    this.ownerId = data.ownerId;
  }
}
// src/app/models/animal.ts
