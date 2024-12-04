import React, { useState } from "react";
import axios from "axios";
import "../styles/BonusCardRegistration.css";

function BonusCardRegistration() {
   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      phone: "",
      birthDate: "",
      gender: "М",
      smsCode: "",
   });
   const [message, setMessage] = useState(""); // Сообщение об ошибке или успехе

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Валидация данных
      if (
         !formData.firstName ||
         !formData.lastName ||
         !formData.phone ||
         !formData.birthDate ||
         !formData.smsCode
      ) {
         setMessage("Пожалуйста, заполните все поля!");
         return;
      }

      try {
         const response = await axios.post(
            "http://localhost:5000/api/bonus-cards",
            formData
         );

         if (response.status === 200) {
            setMessage("Бонусная карта успешно зарегистрирована!");
            setFormData({
               firstName: "",
               lastName: "",
               phone: "",
               birthDate: "",
               gender: "М",
               smsCode: "",
            });
         }
      } catch (error) {
         console.error("Ошибка при регистрации бонусной карты:", error);
         setMessage("Произошла ошибка при регистрации. Попробуйте снова!");
      }
   };

   return (
      <div className="bonus-card-registration">
         <h3>Регистрация бонусной карты</h3>
         <form onSubmit={handleSubmit}>
            <label>
               Имя:
               <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
               />
            </label>
            <label>
               Фамилия:
               <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
               />
            </label>
            <label>
               Телефон:
               <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="^\+?[0-9]{1,15}$" // Регулярное выражение для телефона
               />
            </label>
            <label>
               Дата рождения:
               <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
               />
            </label>
            <label>
               Пол:
               <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
               >
                  <option value="М">Мужской</option>
                  <option value="Ж">Женский</option>
               </select>
            </label>
            <label>
               Код СМС:
               <input
                  type="text"
                  name="smsCode"
                  value={formData.smsCode}
                  onChange={handleChange}
                  required
               />
            </label>
            <button type="submit">Зарегистрировать</button>
         </form>

         {message && <p>{message}</p>}
      </div>
   );
}

export default BonusCardRegistration;
