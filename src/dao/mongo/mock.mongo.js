import MockModel from './models/mock.models.js'

export default class Users {
    constructor(){}

    async get() {
        let mocks = await MockModel.find()
        return mocks;
    }

    async create(mock) {
        let newMock = await MockModel.create(mock)
        return newMock
    }
}