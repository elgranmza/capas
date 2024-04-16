import {GetUserDTO} from "../dao/DTOs/users.dto.js"

class SessionsController{

    static register = async (req,res)=>{
        res.send({
            status:"success",
            message:"usuario registrado"
        })
    
    }

    static failregister = async (req,res)=>{
        console.log("Fallo el registro")
        res.send({error:"fallo en el registro"})
    }

    static login = async (req,res)=>{
    
        console.log("req.user: ",req.user);

        if(!req.user){//Para que quiero este IF si tengo el failureRedirect del passport? Si se llega a esta instancia, es porque existe el usuario en la base de datos
            return res.status(400).send({
                status:"error",
                error:"Datos incorrectos"
            })
        }

        //Aca creamos la session?
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            cart: req.user.cart
        }

        res.send({
        status:"success",
        payload:req.session.user,
        message:"Mi primer login!"
    })

    }
    static current = async (req,res)=>{

    //console.log(req.session.user)
    const userDTOFront = new GetUserDTO(req.session.user);
    
    res.json({
        status:"success",
        payload:userDTOFront,
        message:"Aca estan los datos de la session"
    })

    }

    static faillogin = async (req,res)=>{
        console.log("Fallo el login")
        res.send({error:"fallo en el login"})
    }

    static logout = (req,res)=>{
        console.log("Antes:",req.session)
        req.session.destroy((err)=>{
            if(err)
            {
                console.log("Error: ", err)
                return res.status(500).send({
                    status: "error",
                    error: "No se pudo desloguear"
                })
            }
            res.redirect("/login")
        })
        console.log("Despues:",req.session)
    }

    static githubcallback = async(req,res)=>{
        req.session.user = req.user;
        res.redirect("/products");
    }
}

export {SessionsController}