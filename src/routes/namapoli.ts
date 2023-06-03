import {NamaPoli} from "@prisma/client";
import {Request, Router } from "express";
import prisma from "../utils/prisma"

// const prisma = new PrismaClient

const NamaPoliRoute = Router();

NamaPoliRoute.get("/getNamaPoli",async (req,res) => {
    try {
        const NamaPoliData = await prisma.namaPoli.findMany()

        res.json({
            data : NamaPoliData
        })
    } catch (e) {
        res.json({
            message : " error occure"
        })
    }
})


NamaPoliRoute.get("/getNamaJadwalPoli",async (req,res)=> {
    try {
        const NamaPoliData = await prisma.namaPoli.findMany({
            include:{
                jadwalpoli: true
            }
            
        });

        res.json(NamaPoliData)

    } catch (e) {
        res.json({
            message : "error occure"
        })
    }
})



NamaPoliRoute.post("/createNamaPoli",async (req: Request<{},{},NamaPoli>,res)=>{
    const { namapoli } = req.body
    try {
        const data = await prisma.namaPoli.create({
            data: {
                namapoli : namapoli
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



export default NamaPoliRoute