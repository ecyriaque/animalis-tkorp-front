export class UpdatePersonDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;

  constructor(data: Partial<UpdatePersonDto>) {
    if (data.firstName) this.firstName = data.firstName;
    if (data.lastName) this.lastName = data.lastName;
    if (data.email) this.email = data.email;
    if (data.phoneNumber) this.phoneNumber = data.phoneNumber;
  }
}
