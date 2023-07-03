import { Router } from "express";
import { onlyUserAccess } from "../middlewares/index.js";

const router = Router()

router.get('/chat', onlyUserAccess, (req, res) => {  
    try {
        res.render('chat')    
    } catch (error) {
        res.render('chat', error)
    }
})

export default router;      