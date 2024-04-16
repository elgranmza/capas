export class CartsRepository{

    constructor(dao) {
        this.dao = dao
    }

    getCartsByID = async(cid)=>{
        const cart = await this.dao.getCartsByID(cid);
        return cart;
    }

    deleteProductInCart = async(cid,pid)=>{
        const cart = await this.dao.deleteProductInCart(cid,pid);
        return cart;
    }
}