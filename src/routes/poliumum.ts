import {PoliUmum} from "@prisma/client";
import {Request, Router } from "express";
import prisma from "../utils/prisma"


const poliumumRoute = Router();

poliumumRoute.get("/getPoliUmum",async (req,res) => {
    try {
        const poliUmumData = await prisma.poliUmum.findMany()

        res.json({
            data : poliUmumData
        })
    } catch (e) {
        res.json({
            message : " error occure"
        })
    }
})

poliumumRoute.post("/create",async (req: Request<{},{},PoliUmum>,res)=>{
    const { tanggal } = req.body
    try {
        const data = await prisma.poliUmum.create({
            data: {
                tanggal : new Date(tanggal)
            }
        })

        res.json({
            message: "data berhasil dibuat",
            data
        })
    } catch (e) {
        res.json({
            message : `gagal membuat data ${e}`
        })
    }
})



export default poliumumRoute