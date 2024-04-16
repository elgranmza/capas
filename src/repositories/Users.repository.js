import { CreateUserDTO, GetUserDTO} from "../dao/DTOs/users.dto.js";

export class UsersRepository{
    constructor(dao) {
        this.dao = dao
    }

    getUsers = async(res,req)=>{
        const users = await this.dao.get();
        return users;
    }

    getUserByID = async(id)=>{
        const user = await this.dao.getUserByID(id);
        return user;
    }

    createUser = (user)=>{
        const userDTO = new CreateUserDTO(user);
        const result = this.dao.createUser(userDTO);
        const userDTOFront = new GetUserDTO(result);
        return userDTOFront;

    }

    delete =(id)=>{
        const result = this.dao.delete(id);
        return result;
    }
}