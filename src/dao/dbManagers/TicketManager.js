import {ticketsModel} from "../models/ticket.model.js";

export class TicketManagerDB{

    // async get(){
    //     try{
    //         const users = await userModel.find()
    //         return users
    //     }
    //     catch{
    //         throw new Error(`Hubo un error al obtener los usuarios. Error: ${error.message}`) 
    //     }
    // }

    // getUserByID = async(id)=>{
    //     try{
    //         const user = await userModel.find({_id:id});
    //         return user
    //     }
    //     catch{
    //         throw new Error(`Hubo un error al obtener el usuario. Error: ${error.message}`) 
    //     }
    // }

    create = async(ticket)=>{

        try{
            const user = await ticketsModel.create(ticket);
            return user
        }
        catch{
            return `Hubo un error al crear el ticket.`
        } 
    }

    // delete = async(id)=>{

    //     try{
    //         const user = await userModel.deleteOne({_id:id});
    //         return user
    //     }
    //     catch{
    //         throw new Error(`Hubo un error al crear el usuario nuevo. Error: ${error.message}`) 
    //     } 
    // }


}