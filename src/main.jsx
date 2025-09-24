// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";     //  Bọc App với Redux store
import { store } from "./redux/store";      //  Store đã cấu hình
import App from "./App.jsx";

//  Import đúng file CSS global (styles.css hoặc index.css tuỳ bạn có file nào)
import "./styles.css"; // hoặc "./index.css" nếu file thực tế tên vậy

/**
 *  Áp dụng theme (light/dark) sớm trước khi render React
 * => Tránh tình trạng nháy trắng/đen khi reload
 */
(() => {
  try {
    const saved = localStorage.getItem("theme"); // lấy theme đã lưu
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-theme", saved); // gắn vào <html data-theme="">
    } else {
      // nếu chưa lưu gì thì để CSS quyết định (dark mặc định trong styles.css)
      document.documentElement.removeAttribute("data-theme");
    }
  } catch {
    //  nếu localStorage bị chặn thì bỏ qua
  }
})();

/**
 *  ReactDOM.createRoot: API mới (React 18) để render App
 * Provider: bọc App để toàn bộ component con dùng được Redux
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>     {/* Chế độ strict: cảnh báo thêm lỗi dev */}
    <Provider store={store}>
      <App />            {/* Ứng dụng chính */}
    </Provider>
  </React.StrictMode>
);
