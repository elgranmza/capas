import {Router} from "express"
import { uploader } from "../utils.js";
import { userService } from "../repositories/index.js";
import {checkRole} from "../middlewares/auth.js";

const router = Router();


router.get("/",checkRole(["Admin"]),async (req,res)=>{
    try {
        const users = await userService.getUsers();
        res.json({status:"success", payload: users});
    } catch (error) {
        res.json({status:"error", message:error.message});
        
    }
})

router.get("/:uid",async (req,res)=>{
    try {
        const id= req.params.uid;
        const user = await userService.getUserByID(id);
        res.json({status:"success", payload: user});
    } catch (error) {
        res.json({status:"error", message:error.message});
        
    }
})

router.post("/",uploader.single("thumbnail"),async(req,res)=>{

    try{
        const {first_name,last_name,email}=req.body;

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
    
        const result = await userService.createUser(user);
        res.json({status:"success", payload: result});
    }
    catch{
        res.json({status:"error", message:error.message});
    }
    


    

    

})

router.delete("/:uid",async(req,res)=>{

    try {
        const id=req.params.uid;
        const result= await userService.delete(id);
        res.json({status:"success", payload: result});
    } catch (error) {
        res.json({status:"error", message:error.message});
        
    }
})

router.put("/:uid",async(req,res)=>{

    try {
        const id=req.params.uid;
    
        const {first_name,last_name,email}=req.body;
    
        const updateuser = {
            first_name,
            last_name,
            email
        }
    
        const result= await userService.update(id,updateuser);
        res.json({status:"success", payload: result});
    } catch (error) {
        res.json({status:"error", message:error.message});
        
    }
})

export default router