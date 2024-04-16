import { Router } from "express";
import { generateProduct } from "../utils.js";

const router = Router();

router.get("/", (req,res)=>{
    const cant = 50;
    let products = [];
    for (let i = 0; i < cant; i++) {
        const product = generateProduct();
        products.push(product);
    }
    res.json({status:"success", payload: products})

})

export { router as mockingproductsRouter };