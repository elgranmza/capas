import mongoose from "mongoose";
import { options } from "./options.js";

export const connectDB = async () => {
    try {
        console.log("Se intentará conectar a la base de datos: ",options.mongo.url)
        await mongoose.connect(options.mongo.url);
        console.log('Conectado a la base de datos.');
    } catch (error) {
        console.log(`Hubo un error al tratar de conectar a la BD. El error: ${error}`);
    }
}