// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import WrappedApp from "./App"; // Import component đã export mặc định ở cuối App.js
import "./index.css"; // Tùy chọn: dùng để định nghĩa CSS toàn cục

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>
);
