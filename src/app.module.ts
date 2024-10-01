import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/graphql'), 
    UsersModule,
     GraphQLModule.forRoot<ApolloDriverConfig>({
    autoSchemaFile: "schema.gql",
    driver: ApolloDriver,
    formatError: (error: GraphQLError) => {
      return {
        message: error.message,
        code : error.extensions.status
      }
    }
    
    
    
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
