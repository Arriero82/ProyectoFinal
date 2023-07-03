import mongoose from "mongoose";


const ticketsCollection = "tickets";

const ticketsSchema = mongoose.Schema({
    code: String,
    purchase_datetime: String,
    ammount: Number,
    purchaser: String
});

const Tickets = mongoose.model(ticketsCollection, ticketsSchema);

export default Tickets;
