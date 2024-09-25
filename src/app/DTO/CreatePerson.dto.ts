export class CreatePersonDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  constructor(data: Omit<CreatePersonDto, "constructor">) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
  }
}
