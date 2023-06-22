# APOTEK-APP-API

Express - TS - Prisma

## API cohtoh data Jadwal poli di puskesmas serta API beberapa data lokasi dan alamat apotek di jember
# Dokumentasi

<hr/>

# API
## Base URL : https://express-server-production-8525.up.railway.app/


## DATA JADWAL POLI
1. Data Jadwal
   
   link :  https://express-server-production-8525.up.railway.app/jadwal/getJadwal

   method : GET
    
4. Jadwal Sesuai Hari
   
   link :  https://express-server-production-8525.up.railway.app/jadwal/getJadwalByDay?day=Senin

   method : GET

   params : Senin , Selasa , Rabu , Kamis , Jumat , Sabtu
    
6. Jadwal Sesuai Poli
   
   link :  https://express-server-production-8525.up.railway.app/jadwal/getJadwalByPoli?poli=Poli Umum

   method : GET

   params : Poli Umum, Poli Gigi, Poli mata
    
8. Jadwal Sesai Poli dan Hari
   
   link :  https://express-server-production-8525.up.railway.app/jadwal/getJadwalByPoliByDay?poli=Poli Umum&day=Senin

   method : GET

   params : 
    
10. Crete Jadwal
    
   link :  https://express-server-production-8525.up.railway.app/jadwal/createJadwal

   method : POST

   Data : 
    
11. Update Jadwal

   link :  https://express-server-production-8525.up.railway.app/jadwal/updateJadwal/:id

   method : PUT


## DATA APOTEK JEMBER

   
