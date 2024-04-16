export const checkRole = (roles)=>{
    
    return (req,res,next)=>{
        console.log("El rol es: ",req.user.role)
        if(!req.user){
            return res.json({status:"error", message:"necesitas estar autenticado"});
        }
        if(!roles.includes(req.user.role)){
            return res.json({status:"error", message:"no estas autorizado"});
        }
        next();
    }
}