import { Router, Request } from 'express';
import { Poli } from '@prisma/client';
import prisma from '../utils/prisma';

interface PoliCreateInput extends Poli {}

const JadwalRoute = Router();

/**
 * @method GET
 * ! Route: /getJadwalByDay
 * * Require: query string - day
 * * Example: /jadwal/getJadwalByDay?day=Senin
 */
JadwalRoute.get(
  '/getJadwalByDay',
  async (req: Request<{}, {}, {}, { day: string }>, res) => {
    const { day } = req.query;

    if (!day) {
      res.json({
        message: 'please provide query string: day'
      });
      return;
    }

    try {
      const jadwal = await prisma.jadwalPoli.findMany({
        where: {
          hari: day
        },
        select: {
          hari: true,
          waktu: true,
          Poli: {
            select: {
              nama: true
            }
          }
        }
      });

      res.json({
        data: jadwal
      });
    } catch (e) {
      res.json({
        message: 'db error!'
      });
    }
  }
);

/**
 * @method POST
 * ! Route: /createPoli
 * @param nama String
 * * Example: { "nama": "Poli A" }
 */
JadwalRoute.post(
  '/createPoli',
  async (req: Request<{}, {}, PoliCreateInput>, res) => {
    const { nama } = req.body;

    if (!nama) {
      res.json({
        message:
          'please provide request body with: nama - nama poli'
      });

      return;
    }

    try {
      const poliData = await prisma.poli.create({
        data: {
          nama
        },
      });

      res.json({
        message: 'data created!',
        data: poliData
      });
    } catch (e) {
      res.json({
        message: 'db error!'
      });
    }
  }
);

export default JadwalRoute;
