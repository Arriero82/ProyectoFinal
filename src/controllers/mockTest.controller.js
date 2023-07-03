import { Router } from "express";
import { MockService } from "../repositories/index.js";

const router = Router()

router.get('/', async (req, res) => {
    let result = await MockService.getMocks()   
    res.json({status: 'success', payload: result})
})

router.post('/', async (req, res) => {
    const {name, lastname, phone} = req.body;
    let result = await MockService.createMock({name, lastname, phone})
    res.json({status: 'success', payload: result})
})

export default router