import { Req } from '@nestjs/common';
import { InputType, Int, Field } from '@nestjs/graphql';



@InputType()
export class CreateUserInput  {
  
  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  email: string;

  @Field({nullable: true})
  id: string;


}
