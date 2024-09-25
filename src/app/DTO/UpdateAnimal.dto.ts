// dto/updateAnimal.dto.ts
export class UpdateAnimalDto {
  name?: string;
  species?: string;
  weight?: number;
  color?: string;
  dateOfBirth?: string;
  breed?: string;

  constructor(data: Partial<Omit<UpdateAnimalDto, "constructor">>) {
    if (data.name) this.name = data.name;
    if (data.species) this.species = data.species;
    if (data.weight) this.weight = data.weight;
    if (data.color) this.color = data.color;
    if (data.dateOfBirth) this.dateOfBirth = data.dateOfBirth;
    if (data.breed) this.breed = data.breed;
  }
}
