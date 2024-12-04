import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Card from "./pages/BonusCardRegistration";

function App() {
   return (
      <Router>
         {/* Навигационная панель */}
         <nav>
            <a href="/">Меню Хинкали</a>
         </nav>
         <nav>
            <a href="/bonus-card-registration">Регистрация бонусной карты</a>
         </nav>

         {/* Основной контент */}
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bonus-card-registration" element={<Card />} />
         </Routes>
      </Router>
   );
}

export default App;
