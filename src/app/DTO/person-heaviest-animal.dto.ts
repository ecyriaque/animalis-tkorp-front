import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PersonHeaviestAnimalDto {
  @Field()
  person_id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  animal_id: number;
  @Field()
  animalName: string;

  @Field()
  weight: number;
}
