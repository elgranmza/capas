import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer"
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const createHash = password=>bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const validatePassword = (user,password)=>bcrypt.compareSync(password,user.password);

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,`${__dirname}/public/images`)
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now}-${file.originalname}`)
    }
})

export const uploader= multer({storage})


//----------------Desafio clase 32-----------------------------------------------------------------
import { Faker, es, en } from "@faker-js/faker";

export const customFaker = new Faker({ locale: [en] });

const { commerce, image, database, string, internet, person, phone,datatype, lorem } = customFaker;


export const generateProduct = () =>{
    return {
        id: database.mongodbObjectId(),
        title: commerce.productName(),
        category:commerce.productAdjective(),
        description: commerce.productDescription(),
        price: parseFloat(commerce.price()),
        code: string.alphanumeric(10),
        stock: parseInt(string.numeric(2)),
        thumbnail: image.url()
    }
}