import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './database/users.schema';



@Injectable()
export class UsersService {

  @InjectModel(Users.name) private readonly userModel: Model<Users>

  create(createUserInput: CreateUserInput) {
    
    return this.userModel.create(createUserInput)
  }

  findAll() {
    return this.userModel.find()
  }

  findOne(id: String) {
    return this.userModel.findById(id)
    .then((data) => {
      if(data === null) {
        throw new NotFoundException("User not found")
      }
      return data
    })
    .catch((error) => {
      throw new NotFoundException("User not found")
    })
  }


  findByName(name: String) {
    return this.userModel.findOne({name: name})
    .then((data) => {
   
      if(data === null) {
        throw new NotFoundException("User not found by name ")
      }
      return data
    })
    .catch((error) => {
      throw new NotFoundException("User not found by name ")
    })
  }

  update(id: String, updateUserInput: UpdateUserInput) {
   return this.userModel.findByIdAndUpdate(id, updateUserInput,{new:true})
   .then((data) => {
    
     return data
   })
   .catch((error) => {
      throw new NotFoundException("User not found")
    })



  }

  remove(id: String) {
    return this.userModel.findByIdAndDelete(id)
    .then((data) => {
      return data
    })
    .catch((error) => {
      throw new NotFoundException("User not found")
    })
  }
}
