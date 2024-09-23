import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PersonHeaviestGroupDto {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  totalWeight: number;
}
