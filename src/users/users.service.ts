import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './database/users.schema';
import { GraphQLError } from 'graphql';


@Injectable()
export class UsersService {

@InjectModel(Users.name) private readonly userModel: Model<Users>
  create(createUserInput: CreateUserInput) {
    
    return this.userModel.create(createUserInput)
  }

  findAll() {
    return this.userModel.find()
  }

findOne(id: string) {
    return this.userModel.findById(id)
    .then((data) => {
      if(data === null){
        throw "User not found"
      }
      return data
    })
    .catch((error) => new GraphQLError(error))
  }

findByName(name: string) {
    return this.userModel.findOne({name:name})
    .then((data) => {
      if(data === null){
        throw "User not found"
      }
    })
    .catch((error) => new NotFoundException(error))

}

update(id: string, updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput, {new: true})
    .then((data) => {
      if(data === null){
        throw "user not found"
      }
      return data
    })
    .catch((error) => new GraphQLError(error))

  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id)
    .then((data) => {
      if(data === null){
        throw "user not found"
      }
      console.log(data)
      return data
    })
    .catch((error) => {
      throw new GraphQLError("User not found")
    })
  }
}
