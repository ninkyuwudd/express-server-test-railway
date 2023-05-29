import {JadwalPoli} from "@prisma/client";
import { Request, Router } from "express";
import prisma from "../utils/prisma"

const jadwalPoliRoute = Router();

jadwalPoliRoute.get("/getJadwalPoli", async (req,res) => {
    try {
        const jadwalPoliData = await prisma.jadwalPoli.findMany()

        res.json({
            data: jadwalPoliData
        })
    } catch (e) {
        res.json({
            message : "error get data jadwal poli!"
        })
    }
})


jadwalPoliRoute.post("/createJadwalPoli",async (req: Request<{}, {}, JadwalPoli>,res) => {
    const { idpoli,tanggal } = req.body
    try {
        const data = await prisma.jadwalPoli.create({
            data : {
                idpoli,
                tanggal: new Date(tanggal)
            }
        })

        res.json({
            message: "data berhasil dibuat",
            data
        })
        
    } catch (e) {
        res.json({
            message : "gagal membuat data!"
        })
    }   
})



export default jadwalPoliRoute