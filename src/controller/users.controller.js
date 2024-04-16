import userModel from "../dao/models/user.model.js"

class UserController{

    async get(){
        const users = await userModel.find()
        res.send({
            status: "success",
            message: users
        })
    }

    static getUserByID = async(req,res)=>{
        const id= req.params.uid;
        const user = await userModel.find({_id:id});
        res.send({
            status: "success",
            message: user
        })
    
    }

    static newUser = async(req,res)=>{


        const {first_name,last_name,email}=req.body;
        //console.log(req)
        //const filename = req.file.filename;
    
    
        if(!first_name||!last_name||!email){
            return res.status(400).send({
                status: "error",
                message: "valores incompletos"
            })
        }
    
        const user ={
            first_name,
            last_name,
            email
            //thumbnail:`http://localhost:8080/images/${filename}`
        }
    
        const result = await userModel.create(user);
    
        res.send({
            status: "success",
            message: result
        })
    
    }

    static deleteUser = async(req,res)=>{
        const id=req.params.uid;
        const result= await userModel.deleteOne({_id:id});
    
        res.send({
            status: "success",
            message: result
        })
    
    }

    static updateUser= async(req,res)=>{

        const id=req.params.uid;
    
        const {first_name,last_name,email}=req.body;
    
        const updateuser = {
            first_name,
            last_name,
            email
        }
    
        const result= await userModel.updateOne({_id:id},{$set:updateuser});
    
        res.send({
            status: "success",
            message: result
        })
    
    }
}

export {UserController}