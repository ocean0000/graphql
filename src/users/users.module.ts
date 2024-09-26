import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Users, UsersSchema } from './database/users.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [  MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
