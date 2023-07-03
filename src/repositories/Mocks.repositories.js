import MockDTO from "../dto/mock.dto.js";

export default class MockRepository {
    constructor(dao){
        this.dao = dao
    }

    getMocks = async () => {
        const result = await this.dao.get();
        return result;
    }
    createMock = async (mock) => {
        let mockToInsert = new MockDTO(mock)
        let result = await this.dao.create(mockToInsert)
        return result
    }
}