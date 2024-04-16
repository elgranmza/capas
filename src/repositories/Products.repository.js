export class ProductsRepository{
    constructor(dao) {
        this.dao = dao
    }

    async get(filter,options){
        const result = await this.dao.get(filter,options);
        return result;
    }

    async getProductByID(id){
        const result = await this.dao.getProductByID(id);
        return result;
    }

    async create(product){
        const result = await this.dao.create(product);
        return result;
    }

    async delete(id){
        const result = await this.dao.delete(id);
        return result;
    }

    async put(id,product){
        const result = await this.dao.update(id,product);
        return result;
    }
}