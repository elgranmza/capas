import CartManagerDB from "../dao/dbManagers/CartManagerDB.js";
import ProductManagerDB from "../dao/dbManagers/ProductManagerDB.js";
import userModel from "../dao/models/user.model.js"

const cartManagerMongo = new CartManagerDB();
const productManagerMongo = new ProductManagerDB();

class ViewsController{

    static products = async(req,res)=>{
    
        const {limit,page,sort,category,status,price}=req.query;

        //para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento
        const preSort = sort ? {price:sort === "asc" ? 1:-1} : {};

        const options = {
            limit: limit ? limit:10,
            page: page ? parseInt(page) : 1,
            sort:preSort,
            lean:true

        }

        const filter = category?{category}:{};

    const result = await productManagerMongo.get(filter,options);
    

    if(result.msg.hasPrevPage)
        {
            result.msg.prevPage =`http://localhost:8080/products?page=${options.page -1 }`;
        }

    if(result.msg.hasNextPage)
        {
            result.msg.nextPage =`http://localhost:8080/products?page=${options.page +1 }`;
        }

    
    // Agregamos a cada producto el cid, porque tube problemas con handlebars al leer la propiedad de otras formas.
    for(const data of result.msg.docs)
    {
        data.cid="658cbaa3b299fdafc649721c";
    }
    res.render("products",{msg:result.msg,user:req.session.user})

    }

    static usuarios = async(req,res)=>{
        const users = await userModel.find().lean();
        res.render("users",{users,isAdmin:true})   
    }

    static getCartsByID = async(req,res)=>{
        const cid= req.params.cid;
        const cart = await cartManagerMongo.getCartsByID(cid);
        console.log(cart)
        res.render("carts",{cart})
    
    }
}

export {ViewsController}