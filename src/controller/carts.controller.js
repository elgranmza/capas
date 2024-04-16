import { productService } from "../repositories/index.js";
import {cartService} from "../repositories/index.js";
import {ticketService} from "../repositories/index.js";
import { v4 as uuidv4 } from 'uuid';

import CartManagerDB from "../dao/dbManagers/CartManagerDB.js";
const cartManagerDB = new CartManagerDB();

class CartsController {
    static getCarts = async(req,res)=>{
        const carts = await cartManagerDB.getCarts();
        res.send({
            status: "successs",
            message: carts
        })
    }

    static getCartById = async(req,res)=>{
        const cid= req.params.cid;
        const cart = await cartManagerDB.getCartsByID(cid);
        res.send({
            status: "success",
            message: cart
        })
    
    }

    static newCart = async(req,res)=>{

        const result = await cartManagerDB.createCart();
    
        res.send({
            status: "success",
            message: result
        })
    
    }

    purchase = async (req,res)=>{

        //Traemos el carrito de la base de datos
        const cid= req.params.cid;
        const cart = await cartService.getCartsByID(cid);

        //1- Hagarro cada producto del carrito y lo busco en la db
        if(cart)
        {
            const productTicket= [];
            let totalPrice = 0;

            for(const element of cart.products){

                const productBD = await productService.getProductByID(element.product._id)
                //console.log("productBD",productBD)
                if(productBD)
                {
                    // console.log("productBD.msg[0].stock: ",productBD.msg[0].stock)
                    // console.log("element.quantity: ",element.quantity)
                    if(productBD.msg[0].stock>=element.quantity)
                    {
                        productTicket.push(element)
                        totalPrice = totalPrice + element.product.price;

                        //console.log("Se hizo un push a productTicket")
                        //actualizo cantidad en bd de productos.
                        const result = await productService.put(element.product._id,{stock:productBD.msg[0].stock-element.quantity})
                        //console.log("result:",result)
                        //elimino producto del cart asociado al comprador.
                        const result2 = await cartService.deleteProductInCart(cid,element.product._id.valueOf())
                        //console.log("result2:",result2)
                    } 
                }

            }

            //Generar ticket date.toLocaleString()
            const date = new Date();
            const ticket={
                code: uuidv4(),
                purchase_datetime:date,
                amount: totalPrice,
                purchaser: req.session.user.email
            }

            // console.log("El ticket es: ",ticket)

            const result3 = await ticketService.create(ticket);
            // console.log(result3)
            //console.log("Se Termino el proceso de compra. productTicket.")
            res.send({
                status: "success",
                payload: ticket
                })

        }

        

    }

        static addProduct = async (req,res)=>{

            const cid= req.params.cid;
            const pid= req.params.pid;
            //const quantity=req.params.quantity;
            const quantity= 1
        
            const result = await cartManagerDB.addProductInCart(cid,pid,quantity)
        
            res.send({
                 status: "success",
                 message: result
            })
        }

        static deleteProduct = async (req,res)=>{

            const cid= req.params.cid;
            const pid= req.params.pid;
        
            const result = await cartManagerDB.deleteProductInCart(cid,pid)
        
            res.send({
                 status: "success",
                 message: result
            })
        }

        static updateCart = async (req,res)=>{

            const cid= req.params.cid;
            const products=req.body;// products es un array de productos
        
            const result = await cartManagerDB.updateCart(cid,products)
        
            res.send({
                 status: "success",
                 message: result
            })
        }

        static updateQuantity = async (req,res)=>{

            const cid= req.params.cid;
            const pid= req.params.pid;
            const quantity=req.body.quantity;
        
            const result = await cartManagerDB.updateQualityProduct(cid,pid,quantity)
        
            res.send({
                 status: "success",
                 message: result
            })
        }

        static deleteAllProducts = async (req,res)=>{

            const cid= req.params.cid;
        
            const result = await cartManagerDB.deleteAllProductsInCart(cid)
        
            res.send({
                 status: "success",
                 message: result
            })
        }
}

export {CartsController}