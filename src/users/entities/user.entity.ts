import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  

  @Field()
  name: string;

  @Field({nullable: true})
  email: string;

  @Field({nullable: true})
  id: string;

}
