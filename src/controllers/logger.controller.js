import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    console.log(req.logger);
    if(Object.entries(req.query).length === 0) req.logger.debug('no queries');
    res.json({msg: 'algo'})
})

export default router