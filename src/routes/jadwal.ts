import { Router, Request } from 'express';
import { JadwalPoli, Poli } from '@prisma/client';
import prisma from '../utils/prisma';

interface PoliCreateInput extends Poli, JadwalPoli {}

const JadwalRoute = Router();

/**
 * @method GET
 * ! Route: /getJadwalByDay
 * * Require: query tring - day
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

JadwalRoute.post(
  '/createPoli',
  async (req: Request<{}, {}, PoliCreateInput>, res) => {
    const { nama, hari, waktu } = req.body;

    if (!nama || !hari || !waktu) {
      res.json({
        message:
          'please provide request body with: nama - nama poli, hari - jadwal hari poli, waktu - jadwal waktu poli'
      });

      return;
    }

    try {
      const poliData = await prisma.poli.create({
        data: {
          nama,
          jadwalPoli: {
            create: {
              hari,
              waktu
            }
          }
        },
        include: {
          jadwalPoli: true
        }
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
