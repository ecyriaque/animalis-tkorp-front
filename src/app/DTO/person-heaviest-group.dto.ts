export class PersonHeaviestGroupDto {
  id: number;

  firstName: string;

  lastName: string;

  totalWeight: number;

  constructor(data: Omit<PersonHeaviestGroupDto, "constructor">) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.totalWeight = data.totalWeight;
  }
}
