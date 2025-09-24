// src/App.jsx
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ThemeToggle from "./components/ThemeToggle";

// ⛔ CHỌN 1 TRONG 2 DÒNG IMPORT SAU, cái nào khớp tên file thực tế của bạn thì giữ lại:
// import ProductList from "./components/ProductList";   // nếu file là ProductList.jsx
import ProductList from "./components/Productlist";      // nếu file là Productlist.jsx

export default function App() {
  return (
    <div>
      {/* Thanh điều hướng (sticky) */}
      <Navbar />

      {/* Nút đổi theme nổi góc phải */}
      <div
        style={{
          position: "fixed",
          top: 12,
          right: 16,
          zIndex: 50,
        }}
      >
        <ThemeToggle />
      </div>

      {/* Layout 2 cột: trái là danh sách sp, phải là giỏ hàng */}
      <div className="container">
        <div className="grid">
          <ProductList />
          <Cart />
        </div>
      </div>
    </div>
  );
}
