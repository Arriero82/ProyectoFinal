import mongoose from "mongoose";

const collectionName = 'mock';

const collectionSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    active: Boolean,
    phone: String
})
    
const Mocks = mongoose.model(collectionName, collectionSchema)

export default Mocks