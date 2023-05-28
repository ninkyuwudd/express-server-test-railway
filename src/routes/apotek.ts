import {Apotek} from "@prisma/client";
import {Request, Router } from "express";
import prisma from "../utils/prisma"

const apotekRoute = Router();

apotekRoute.get("/getApotek",async (req,res) => {
    try {
        const apotekData = await prisma.apotek.findMany()

        res.json({
            data: apotekData
        })
    } catch (e) {
        res.json({
            message: "error occure"
        })
    }
})

apotekRoute.get("/getApotekById/:id" ,async(req,res) => {
    try {
            const apotekData = await prisma.apotek.findUnique({
                where: {
                    id: req.params.id
                }
            });
            res.json({
                data : apotekData
            })
    } catch (e) {
        res.json({
            message : req.params.id
        })
    }
})


apotekRoute.delete("/delete/:id", async (req ,res ) => {
    const apotekId = req.params.id
    try {
        const deleteData = await prisma.apotek.delete({
        where: {
                id : apotekId
            }
        })
        res.json({
            message: `berhasil menghapus ${deleteData.name}`
        })
        console.log(deleteData.name)
    } catch (e) {
        res.json({
            message:"gagal menghapus"
        })
    }
})


apotekRoute.put("/update/:id",async (req,res) => {
    const apotekId = req.params.id
    let apotekData = req.body
    try {
        const updateData = await prisma.apotek.update({
            where : {
                id : apotekId
            },
            data : {
                name : apotekData.name,
                lat: apotekData.lat,
                long: apotekData.long,
                detail : apotekData.detail
                
            }
        })
        res.json({
            message : `Berhasil Update pada id: ${updateData.id}`
        })
        console.log(updateData.id)
    } catch (e) {
        res.json({
            message : "error update"
        })
    }
})

apotekRoute.post("/create",async (req: Request<{},{}, Apotek>,res)=>{
    const { lat, long, name, detail } = req.body
    try {
        const data = await prisma.apotek.create({
            data: {
                lat,
                long,
                name,
                detail
            }
        })

        res.json({
            message: "data berhasil dibuat",
            data
        })
        
    } catch (e) {
        console.log(e)
        res.json("server error")
    }
})





export default apotekRoute