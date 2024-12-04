import React, { useState } from "react";
import axios from "axios"; // Подключаем axios для отправки запросов
import "../styles/ReservationForm.css"; // Подключаем стили для формы бронирования

function ReservationForm() {
   const [reservation, setReservation] = useState({
      name: "",
      phone: "",
      guests: 2,
      date: "",
      time: "",
      address: "",
   });
   const [message, setMessage] = useState(""); // Для отображения сообщения после отправки

   const handleChange = (e) => {
      const { name, value } = e.target;
      setReservation((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Преобразуем время в формат HH:mm:ss
      const formattedTime = reservation.time
         ? reservation.time + ":00"
         : "00:00:00"; // это добавит секунды

      const reservationData = {
         ...reservation,
         time: formattedTime,
      };

      try {
         const response = await axios.post(
            "http://localhost:5000/api/reservations",
            reservationData
         );

         if (response.status === 200) {
            setMessage("Бронирование успешно!");
            setReservation({
               name: "",
               phone: "",
               guests: 2,
               date: "",
               time: "",
               address: "",
            });
         }
      } catch (error) {
         console.error("Ошибка при отправке данных:", error);
         setMessage("Произошла ошибка. Попробуйте снова!");
      }
   };

   return (
      <div className="reservation-form-container">
         <h3>Забронировать столик</h3>
         <form onSubmit={handleSubmit}>
            <label>
               Имя:
               <input
                  type="text"
                  name="name"
                  value={reservation.name}
                  onChange={handleChange}
                  required
               />
            </label>
            <label>
               Телефон:
               <input
                  type="tel"
                  name="phone"
                  value={reservation.phone}
                  onChange={handleChange}
                  required
               />
            </label>
            <label>
               Количество гостей:
               <input
                  type="number"
                  name="guests"
                  min="2"
                  max="15"
                  value={reservation.guests}
                  onChange={handleChange}
                  required
               />
            </label>
            <label>
               Дата:
               <input
                  type="date"
                  name="date"
                  value={reservation.date}
                  onChange={handleChange}
                  required
               />
            </label>
            <label>
               Время:
               <input
                  type="time"
                  name="time"
                  value={reservation.time}
                  onChange={handleChange}
                  required
               />
            </label>
            <label>
               Адрес:
               <input
                  type="text"
                  name="address"
                  value={reservation.address}
                  onChange={handleChange}
                  required
               />
            </label>
            <button type="submit">Забронировать</button>
         </form>
         {message && <p>{message}</p>}
      </div>
   );
}

export default ReservationForm;
