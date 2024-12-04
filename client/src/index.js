import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css"; // Импортируем глобальные стили
import App from "./App";

ReactDOM.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById("root")
);
