import { UsersRepository } from "./Users.repository.js";
import { ProductsRepository } from "./Products.repository.js";
import { CartsRepository } from "./Carts.repository.js";
import { TicketRepository } from "./Ticket.repository.js";

import {UserManagerDB} from "../dao/dbManagers/UserManagerDB.js"
import ProductManagerDB from "../dao/dbManagers/ProductManagerDB.js"
import CartManagerDB from "../dao/dbManagers/CartManagerDB.js"
import {TicketManagerDB} from "../dao/dbManagers/TicketManager.js"

import { connectDB } from "../config/dbConnection.js";
connectDB();

export const userService = new UsersRepository(new UserManagerDB());
export const productService = new ProductsRepository(new ProductManagerDB());
export const cartService = new CartsRepository(new CartManagerDB());
export const ticketService = new TicketRepository(new TicketManagerDB());