export default class Mocks {
    constructor(){
        this.data = []
    }

    async get() {
        return this.data
    }

    async create(mock) {
        return this.data.push(mock)
    }
}