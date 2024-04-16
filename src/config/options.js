import dotenv from "dotenv";

const result = dotenv.config()

if (result.error) {
  throw result.error
}

// console.log("Buscar PORT")
// console.log("Las variables del sistema son: ",process.env)

export const options = {
    server:{
        port: process.env.PORT
    },
    mongo:{
        url:process.env.MONGO_URL
    }
}