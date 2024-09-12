import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  providers: [UserResolver, UserService],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>
    (
      {
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }
    )
  ],
})
export class UserModule {}
