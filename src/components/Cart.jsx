// src/components/Cart.jsx
import { useDispatch, useSelector } from "react-redux"; 
//   import 2 hook của react-redux:
// - useDispatch: gửi action lên Redux store
// - useSelector: đọc dữ liệu từ Redux store

import CartItem from "./CartItem"; 
//   Component con để render từng sản phẩm trong giỏ

import { clearCart } from "../redux/cart/cartSlice"; 
//   Import action creator clearCart từ cartSlice để xóa toàn bộ giỏ hàng

export default function Cart() {
  const dispatch = useDispatch(); 
  //   Lấy hàm dispatch để gọi action (giống như store.dispatch)

  // Lấy danh sách item trong giỏ
  const items = useSelector((state) => state.cart.items ?? []); 
  //   Lấy state.cart.items từ Redux store
  // Nếu items = null/undefined thì gán mặc định = []

  // Tính tổng số lượng sản phẩm
  const totalQty = items.reduce((sum, it) => sum + (it.qty || 0), 0);
  //   Duyệt qua từng item, cộng dồn số lượng (qty)
  // Nếu qty null/undefined thì mặc định = 0

  // Tính tổng số tiền
  const totalPrice = items.reduce(
    (sum, it) => sum + (it.qty || 0) * (it.price || 0),
    0
  );
  //   Duyệt qua từng item, tính (qty * price), cộng dồn vào sum

  // Format số tiền sang VND
  const formatVND = (value) =>
    Number(value || 0).toLocaleString("vi-VN", { maximumFractionDigits: 0 });
  //   Hàm chuyển số thành chuỗi có phân cách hàng nghìn
  // Ví dụ: 1000000 -> "1.000.000"

  return (
    <aside className="sidebar"> 
      {/*   Thẻ aside hiển thị giỏ hàng, có class CSS "sidebar" */}

      <h2 className="section-title">Giỏ hàng</h2> 
      {/*   Tiêu đề giỏ hàng */}

      {/* Danh sách sản phẩm trong giỏ */}
      <div className="stack">
        {items.length === 0 ? ( 
          //  Nếu giỏ hàng rỗng
          <div className="muted">Chưa có sản phẩm.</div>
          //  Hiển thị chữ nhạt "Chưa có sản phẩm."
        ) : (
          //  Nếu có sản phẩm
          items.map((item) => <CartItem key={item.id} item={item} />)
          //  Render từng sản phẩm bằng CartItem
        )}
      </div>

      {/* Tổng cộng */}
      <div className="totals">
        <div>Tổng ({totalQty} SP)</div>
        {/*  Hiển thị tổng số lượng sản phẩm trong giỏ */}

        <div>
          {formatVND(totalPrice)} <span className="currency">đ</span>
          {/*  Hiển thị tổng giá trị giỏ hàng, format theo VND */}
        </div>
      </div>

      {/* Hành động */}
      <div className="stack">
        <button
          className="btn btn-primary"
          disabled={items.length === 0}
          //  Nếu giỏ rỗng thì disable nút
          onClick={() => alert("Chức năng thanh toán đang phát triển 😅")}
          //  Tạm thời chỉ alert, chưa có logic thanh toán
        >
          Thanh toán
        </button>

        <button
          className="btn btn-danger"
          disabled={items.length === 0}
          // Nếu giỏ rỗng thì disable nút
          onClick={() => dispatch(clearCart())}
          // khi bấm thì dispatch action clearCart để xóa giỏ
        >
          Xóa giỏ
        </button>
      </div>
    </aside>
  );
}
