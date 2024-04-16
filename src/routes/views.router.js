import {Router} from "express"
import {ViewsController} from "../controller/views.controller.js"

const router = Router();

const publicAccess = (req,res,next)=>{
    if(req.session.user){
        return res.redirect("/")
    }
    next();
}

const privateAccess = (req,res,next)=>{
    if(!req.session.user){
        return res.redirect("/login")
    }
    next();
}

router.get("/",privateAccess,(req,res)=>{
    res.render("profile",{user:req.session.user})
})

router.get("/login",publicAccess,(req,res)=>{
    res.render("login")
})

router.get("/register",publicAccess,(req,res)=>{
    res.render("register")
})

router.get("/usuarios",ViewsController.usuarios)

router.get("/products",privateAccess, ViewsController.products)

router.get("/carts/:cid",ViewsController.getCartsByID)

router.get("/chat",async(req,res)=>{
    //const chat = await chatModel.find().lean();
    res.render("chat",{})

})

export default router;