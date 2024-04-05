import express from "express";
import {Bird} from  '../models/bird.js'

// dieser Router wird nur aufgerufen, wenn der Request auf /birds beginnt
const router = express.Router();


// d.h. wird diese route bei GET /birds/ ausgelöst
router.get("/", async (req, res)=>{
    const birds = await Bird.find().lean()
    res.json(birds)
});



export default router