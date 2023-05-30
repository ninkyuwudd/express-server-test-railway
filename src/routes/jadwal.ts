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


jadwalPoliRoute.delete("/deleteJadwal/:id", async (req,res)=> {
    const jadwalpoliId = req.params.id
    try {
        const deleteData = await prisma.jadwalPoli.delete({
            where : {
                id : jadwalpoliId
            }
        })
        res.json({
            message : `berhasil menghapus jadwal pada :${deleteData.tanggal} ,idpoli :${deleteData.idpoli}`
        })
    } catch (e) {
        res.json({
            message : "gagal menghapus data"
        })
    }
})

jadwalPoliRoute.put("/updateJadwal/:id",async (req ,res ) => {
    const jadwalpoliId = req.params.id
    try {
        let jadwalPoliData = req.body
        const updateData = await prisma.jadwalPoli.update({
            where : {
                id : jadwalpoliId
            },
            data : {
                idpoli : jadwalPoliData.idpoli,
                tanggal : jadwalPoliData.tanggal
            }

        })
        res.json({
            message : `Berhasil Update pada id: ${jadwalpoliId}`
        })
        console.log(updateData.id)
    } catch (e) {
        
    }
    
})


export default jadwalPoliRoute