import productsModel from "../models/products.model.js";

class ProductManagerDB{

    get = async(filter,options)=>{
        const products = await productsModel.paginate(
            filter,
            options
        );
        
        return {
            status: "success",
            msg: products
        };
    } 

    getProductByID = async(pid)=>{
        const product = await productsModel.find({_id:pid});
        return {
            status: "success",
            msg: product
        };
    } 

    create = async({title,category,description,price,code,stock,filename})=>{

        try{
            if(!title||!category||!description||!price||!code||!stock){
                return "Datos incompletos"
            }
        
            const product ={
                title,
                category,
                description,
                price,
                code,
                stock,
                thumbnail:`http://localhost:8080/images/${filename}`
            }
    
            const result = await productsModel.create(product)
            return "Producto creado satisfactoriamente"
        }
        catch{
            console.log("Error en producmanager")
            return "Hubo un error al crear el producto"
        }

        

    }

    delete = async(pid)=>{
        const result= await productsModel.deleteOne({_id:pid});
        return result
    } 

    update = async(pid,product)=>{

        const result= await productsModel.updateOne({_id:pid},{$set:product});
        return result
     } 
}

export default ProductManagerDB


