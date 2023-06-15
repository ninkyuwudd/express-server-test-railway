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
          id : true,
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



JadwalRoute.get(
  '/getJadwalByPoli',
  async (req: Request<{}, {}, {}, { poli: string }>, res) => {
    const { poli } = req.query;

    if (!poli) {
      res.json({
        message: 'please provide query string: poli'
      });
      return;
    }

    try {
      const jadwal = await prisma.poli.findMany({
        where: {
          nama: poli
        },
        select: {
          nama: true,
          jadwalPoli: {
            select: {
              hari : true,
              waktu : true
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


JadwalRoute.get(
  '/getJadwalByPoliByDay',
  async (req: Request<{}, {}, {}, { poli: string,day: string }>, res) => {
    const { poli , day } = req.query;

    if (!poli || !day) {
      res.json({
        message: 'please provide query string: poli or day'
      });
      return;
    }

    try {
      const jadwal = await prisma.poli.findMany({
        where: {
          nama: poli,
          jadwalPoli : {
            some: {
              hari : day
            }
          }

        },
        select: {
          nama: true,
          jadwalPoli: {
            select: {
              hari : true,
              waktu : true
            },
            where: {
              hari: day
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








JadwalRoute.get("/getPoli",async (req,res) => {
  const getpolidata = await prisma.poli.findMany()

  try {
    res.json({
      data: getpolidata
  })

  } catch (e) {
    res.json({
      message : "error fetching data!"
  })
  }
})



JadwalRoute.get("/getJadwal",async (req,res) => {
  const getJawalData = await prisma.jadwalPoli.findMany()

  try {
    res.json({
      data : getJawalData
    })
  } catch (e) {
    res.json({
      message : "error fetching data!"
  })
  }
})



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

 * TODO: one route 2 way func
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
        let errorMessage: String;

        // poliData.jadwalPoli.some((jadwal) => {
        //   if (jadwal.hari === hari) {
        //     errorMessage = `${poliData.nama} telah memiliki jadwal pada hari ${hari}`;
        //   }
        // });

        if (errorMessage) {
          res.json({
            message: errorMessage
          });

          return;
        }
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



JadwalRoute.delete("/delPoli/:id",async(req,res) => {
  const poliId = req.params.id
  
  try {
    const deleteData = await prisma.poli.delete({
      where : {
        id : poliId
      }
    })

    res.json({
      message : `berhasil menghapus : ${deleteData.nama}`
    })
  } catch (e) {
    res.json({
      message : `gagal menghapus data`
    })
  }
})


JadwalRoute.delete("/delJadwal/:id",async (req,res) => {
  const jdwl = req.params.id
  try {
    const deleteData = await prisma.jadwalPoli.delete({
      where : {
        id : jdwl
    }})

    res.json({
      message : `berhasil menghapus ${deleteData.hari}`
    })

  } catch (e) {
    res.json({
      message : "gagal menghapus"
    })
  }
})


JadwalRoute.put("/updateJadwal/:id",async (req,res)=> {
  const jadwalId = req.params.id
  let jadwalData = req.body

  try {
    const updateData = await prisma.jadwalPoli.update({
      where : {
        id : jadwalId
      },
      data : {
        waktu : jadwalData.waktu
      }
    })

    res.json({
      message : `Berhasil Update pada waktu: ${updateData.waktu}`
    })

  } catch (e) {
    res.json({
      message : "error update"
  })
  }



})





export default JadwalRoute;


