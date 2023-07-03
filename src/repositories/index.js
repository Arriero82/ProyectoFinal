import {mockDao} from '../dao/factory.js'
import MockRepository from './Mocks.repositories.js'


export const MockService = new MockRepository(new mockDao())