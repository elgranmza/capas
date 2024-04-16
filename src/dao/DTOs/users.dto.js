export class CreateUserDTO{
    constructor(user){
        this.fullName = `${user.firts_name} ${user.last_name}`;
        this.firts_name = user.firts_name;
        this.last_name = user.last_name;
        this.telefono = user.telefono;
        this.email = user.email;
        this.password = user.password;
    }
}

export class GetUserDTO{
    constructor(userDB){
        this.fullName = `${userDB.first_name} ${userDB.last_name}`;
        this.email = userDB.email
        this.cart = userDB.cart
    }
}