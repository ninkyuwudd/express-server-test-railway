import { Router, Request } from 'express';
import { JadwalPoli, Poli } from '@prisma/client';
import prisma from '../utils/prisma';

interface PoliCreateInput extends Poli {}
interface JadwalCreateInput extends JadwalPoli, Poli {}

const JadwalRoute = Router();

/**
 * @method GET
 * ! Route: /getJadwalByDay
 * @param day - String: query string
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
 * @param nama String: Nama poli
 * * Example: { "nama": "Poli A" }
 */
JadwalRoute.post(
  '/createPoli',
  async (req: Request<{}, {}, PoliCreateInput>, res) => {
    const { nama } = req.body;

    if (!nama) {
      res.json({
        message: 'please provide request body with: nama - nama poli'
      });

      return;
    }

    try {
      const poliData = await prisma.poli.create({
        data: {
          nama
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

/**
 * @method POST
 * ! Route: /createJadwal
 * @param hari - String
 * @param waktu - String
 * @param nama - String: Nama poli yang akan dikoneksikan dengan jadwal
 * * Example: { "hari": "Senin", "waktu": "09:00 - 12:00", "nama": "Poli A" }
 */
JadwalRoute.post(
  '/createJadwal',
  async (req: Request<{}, {}, JadwalCreateInput>, res) => {
    const { hari, waktu, nama } = req.body;

    if (!hari || !waktu || !nama) {
      res.json({
        message:
          'please provide request body with: hari - jadwal hari poli, waktu - jadwal waktu poli, nama - nama poli'
      });

      return;
    }

    try {
      const poliData = await prisma.poli.findFirst({
        where: {
          nama
        },
        include: {
          jadwalPoli: true
        }
      });

      if (poliData.jadwalPoli) {
        for (const jadWalHari of poliData.jadwalPoli) {
          if (jadWalHari.hari === hari) {
            res.json({
              message: `${poliData.nama} telah memiliki jadwal pada hari ${hari}`
            });

            break;
          }
        }
        return;
      }

      const jadwalPoliData = await prisma.jadwalPoli.create({
        data: {
          hari,
          waktu,
          Poli: {
            connect: {
              id: poliData.id
            }
          }
        }
      });

      res.json({
        message: 'data created!',
        data: jadwalPoliData
      });
    } catch (e) {
      res.json({
        message: 'nama poli tersebut tidak ada!'
      });
    }
  }
);

export default JadwalRoute;
