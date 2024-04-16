import ProductManagerDB from "../dao/dbManagers/ProductManagerDB.js";

const productManagerMongo = new ProductManagerDB();

class ProductsController{
    static getProducts = async(req,res)=>{

        try{
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
    
            let products = await productManagerMongo.getProducts(filter,options)
    
            if(products.msg.hasPrevPage)
            {
                products.msg.prevLink =`http://localhost:8080/api/products?limit=${limit}&page=${options.page -1 }`;
            }
    
            if(products.msg.hasNextPage)
            {
                products.msg.nextPage =`http://localhost:8080/api/products?limit=${limit}&page=${options.page +1 }`;
            }
    
            res.send({
                status: "success",
                message: products
            })
    
        }
        catch(error){
            console.log(error)
        }
    }

    static getProductByID= async(req,res)=>{
        const id= req.params.pid;
        const product = await productManagerMongo.getProductByID(id)
        res.send({
            status: "success",
            message: product
        })
    
    }

    static addProduct = async(req,res)=>{


        const {title,category,description,price,code,stock}=req.body;
        const filename = req.file.filename;
    
        const result = await productManagerMongo.createProduct(title,category,description,price,code,stock,filename);
    
        res.send({
            status: "success",
            message: result
        })
    
    }

    static deleteProduct = async(req,res)=>{
        const pid=req.params.pid;
        const result = await productManagerMongo.deleteProduct(pid);
        
        res.send({
            status: "success",
            message: result
        })
    
    }

    static updateProduct = async(req,res)=>{

        const pid=req.params.pid;
        const {title,category,description,price,code,stock}=req.body;
        //const filename = req.file.filename;
    
        const result = await productManagerMongo.updateProduct(pid,title,category,description,price,code,stock);
    
        res.send({
            status: "success",
            message: result
        })   
    }
}

export {ProductsController}