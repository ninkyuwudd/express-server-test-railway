import { Router, Request } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../utils/prisma';

const JadwalRoute = Router();

// get Jadwal by hari
JadwalRoute.get(
  '/getJadwalByDay',
  async (req: Request<{}, {}, {}, { day: String }>, res) => {
    const { day } = req.query;

    if (!day) {
      res.json({
        message: 'please provide query string: day'
      });
      return;
    }

    const jadwal = await prisma.jadwalPoli.findMany({
      where: {
        hari: day as string | Prisma.StringFilter
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
  }
);

export default JadwalRoute;
