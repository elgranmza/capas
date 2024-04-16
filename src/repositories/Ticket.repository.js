export class TicketRepository{
    constructor(dao) {
        this.dao = dao
    }

    create = (ticket)=>{

        const result = this.dao.create(ticket);
        return result;

    }
}