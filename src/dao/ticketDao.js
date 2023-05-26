const ticketModel = require('../model/ticket.model')

class TicketDao {
    getAllTickets = async () => {
        try {
            return await ticketModel.find({}).lean();
        } catch (error) {
            console.log("🚀 ~ file: ticketDao.js:8 ~ TicketDao ~ getAllTickets= ~ error:", error)
            
        }
    };

    getTicketById = async (id) => {
        try {
            const data = await ticketModel.findById({_id: id})
            if(!data) return 'ticket no encontrado'
            return data
        } catch (error) {
            console.log("🚀 ~ file: ticketDao.js:17 ~ TicketDao ~ getTicketById= ~ error:", error)
            
        }
    }

    createUser= async (newTicket) =>{
        try {
            return await ticketModel.create(newTicket);
        } catch (error) {
            console.log("🚀 ~ file: ticketDao.js:28 ~ TicketDao ~ createUser= ~ error:", error)
            
        }
    }

    
}

module.exports = TicketDao;