import React, { useState, useEffect } from "react";
import "../styles/Home.css"; // Подключаем стили для главной страницы
import ReservationForm from "./ReservationForm"; // Подключаем компонент формы бронирования

function Home() {
   const [menuItems, setMenuItems] = useState([]);

   // Запрос на сервер для получения данных о меню
   useEffect(() => {
      fetch("http://localhost:5000/api/menu")
         .then((response) => response.json())
         .then((data) => setMenuItems(data))
         .catch((error) => console.error("Ошибка при загрузке меню:", error));
   }, []);

   return (
      <div className="container">
         <h1>Меню Хинкали</h1>

         {/* Сетка для меню */}
         <div className="menu-list">
            {menuItems.map((item) => (
               <div className="menu-item" key={item.MenuItemID}>
                  <img src={item.ImagePath} alt={item.Name} />
                  <h2>{item.Name}</h2>
                  <p>Вес: {item.Weight} г</p>
                  <p>Ингредиенты: {item.Ingredients}</p>
                  <p className="price">{item.Price} ₽</p>
               </div>
            ))}
         </div>

         {/* Вставляем форму бронирования внизу страницы */}
         <ReservationForm />
      </div>
   );
}

export default Home;
