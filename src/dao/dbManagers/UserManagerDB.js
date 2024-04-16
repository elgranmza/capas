import userModel from "../models/user.model.js";

export class UserManagerDB{

    async get(){
        try{
            const users = await userModel.find()
            return users
        }
        catch{
            throw new Error(`Hubo un error al obtener los usuarios. Error: ${error.message}`) 
        }
    }

    getUserByID = async(id)=>{
        try{
            const user = await userModel.find({_id:id});
            return user
        }
        catch{
            throw new Error(`Hubo un error al obtener el usuario. Error: ${error.message}`) 
        }
    }

    createUser = async(newUser)=>{

        try{
            const user = await userModel.create(newUser);
            return user
        }
        catch{
            throw new Error(`Hubo un error al crear el usuario nuevo. Error: ${error.message}`) 
        } 
    }

    delete = async(id)=>{

        try{
            const user = await userModel.deleteOne({_id:id});
            return user
        }
        catch{
            throw new Error(`Hubo un error al crear el usuario nuevo. Error: ${error.message}`) 
        } 
    }


}