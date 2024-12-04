const express = require("express");
const mssql = require("mssql");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json()); // Для парсинга JSON в теле запроса
app.use(cors()); // Разрешаем кросс-доменные запросы

// Настройка подключения к базе данных MSSQL
const sqlConfig = {
   server: "localhost",
   database: "Hinkal",
   user: "TestUser",
   password: "StrongPassword!",
   options: {
      encrypt: false, // или true, если используется шифрование
      trustServerCertificate: true, // для локального сервера
   },
};

// API для получения меню
app.get("/api/menu", async (req, res) => {
   try {
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request().query("SELECT * FROM MenuItems");
      res.json(result.recordset);
   } catch (err) {
      console.error("Ошибка подключения:", err);
      res.status(500).send("Ошибка сервера");
   }
});

// API для создания бронирования
app.post("/api/reservations", async (req, res) => {
   const { name, phone, guests, date, time, address } = req.body;

   try {
      const pool = await mssql.connect(sqlConfig); // подключаемся к базе данных
      await pool
         .request()
         .input("Name", mssql.NVarChar, name)
         .input("Phone", mssql.NVarChar, phone)
         .input("GuestCount", mssql.Int, guests)
         .input("ReservationDate", mssql.Date, date)
         .input("ReservationTime", mssql.NVarChar, time)
         .input("Address", mssql.NVarChar, address).query(`
            INSERT INTO Reservations (GuestName, GuestPhone, GuestCount, ReservationDate, ReservationTime, Address)
            VALUES (@Name, @Phone, @GuestCount, @ReservationDate, @ReservationTime, @Address)
         `);

      res.status(200).send("Бронирование успешно!");
   } catch (error) {
      console.error("Ошибка при сохранении бронирования:", error);
      res.status(500).send("Ошибка сервера");
   }
});

// API для регистрации бонусной карты
app.post("/api/bonus-cards", async (req, res) => {
   const { firstName, lastName, phone, birthDate, gender, smsCode } = req.body;

   try {
      const pool = await mssql.connect(sqlConfig);
      await pool
         .request()
         .input("FirstName", mssql.NVarChar, firstName)
         .input("LastName", mssql.NVarChar, lastName)
         .input("Phone", mssql.NVarChar, phone)
         .input("BirthDate", mssql.Date, birthDate)
         .input("Gender", mssql.Char(1), gender)
         .input("SmsCode", mssql.NVarChar, smsCode).query(`
        INSERT INTO BonusCards (FirstName, LastName, Phone, BirthDate, Gender, SmsCode)
        VALUES (@FirstName, @LastName, @Phone, @BirthDate, @Gender, @SmsCode)
      `);

      res.status(200).send("Бонусная карта успешно зарегистрирована!");
   } catch (error) {
      console.error("Ошибка при регистрации бонусной карты:", error);
      res.status(500).send("Ошибка сервера");
   }
});

// Запуск сервера
app.listen(port, () => {
   console.log(`Сервер запущен на порту http://localhost:${port}`);
});
