import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PersonMostAnimalsDto {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  animalCount: number;
}
