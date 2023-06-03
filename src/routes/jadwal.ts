import { Jadwal } from "@prisma/client";
import { Request,Router } from "express";
import prisma from "../utils/prisma";


const JadwalRoute = Router();

JadwalRoute.get("/getJadwal",async (req,res) => {
    try {
        const JadwalData = await prisma.jadwal.findMany()

        res.json({
            data : JadwalData
        })
    } catch (e) {
        res.json({
            message : "error occure"
        })
    }
});

JadwalRoute.post("/createJadwal",async (req: Request<{}, {}, Jadwal> ,res) => {
    const { idpoli , idjadwalpoli } = req.body
    try {

        const data = await prisma.jadwal.create({
            data : {
                idpoli,
                idjadwalpoli
            }
        })

        res.json({
            message : "data berhasil dibuat",
            data
        })
    } catch (e) {
        console.log(e),
        res.json("server error !")
    }
})


export default JadwalRoute