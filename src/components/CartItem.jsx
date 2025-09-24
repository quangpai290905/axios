// src/components/CartItem.jsx
import { useDispatch } from "react-redux"
//  import hook `useDispatch` để gửi action lên Redux store

import {
  increase,
  decrease,
  removeItem,
  setQuantity,
} from "../redux/cart/cartSlice"   //  import các action từ cartSlice trong thư mục redux

//  Component CartItem nhận props `item` (một sản phẩm trong giỏ)
export default function CartItem({ item }) {
  const dispatch = useDispatch() 
  //  Khởi tạo dispatch để có thể gửi action

  // Hàm xử lý khi người dùng thay đổi trực tiếp số lượng trong input
  const onChangeQty = (e) => {
    const raw = e.target.value                 //  Lấy giá trị từ input
    const qty = Math.max(1, parseInt(raw || "0", 10)) 
    //  Ép thành số nguyên, tối thiểu là 1
    dispatch(setQuantity({ id: item.id, qty })) 
    //  Gửi action setQuantity để cập nhật số lượng sản phẩm trong store
  }

  return (
    <div className="cart-line">
      {/* Ảnh sản phẩm nhỏ trong giỏ */}
      <img className="cart-thumb" src={item.image} alt={item.name} />

      <div>
        {/* Tên sản phẩm */}
        <div style={{ fontWeight: 600 }}>{item.name}</div>
        {/* Giá đơn vị */}
        <div className="muted">{item.price.toLocaleString()} đ</div>

        {/* Nhóm nút tăng/giảm số lượng và nút xóa */}
        <div className="cart-actions">
          {/* Nút giảm */}
          <button
            className="btn"
            aria-label="Giảm 1"
            onClick={() => dispatch(decrease(item.id))}
            disabled={item.qty <= 1} 
            //  Nếu số lượng <= 1 thì disable (không cho giảm nữa)
          >
            −
          </button>

          {/* Input nhập số lượng */}
          <div className="qty">
            <label className="sr-only" htmlFor={`qty-${item.id}`}>
              Số lượng
            </label>
            <input
              id={`qty-${item.id}`}
              type="number"
              min={1}
              value={item.qty}            //  Giá trị hiện tại
              onChange={onChangeQty}      //  Cập nhật khi nhập tay
            />
          </div>

          {/* Nút tăng */}
          <button
            className="btn"
            aria-label="Tăng 1"
            onClick={() => dispatch(increase(item.id))}
          >
            +
          </button>

          {/* Nút xóa sản phẩm */}
          <button
            className="btn btn-ghost"
            onClick={() => dispatch(removeItem(item.id))}
          >
            Xóa
          </button>
        </div>
      </div>

      {/* Thành tiền của sản phẩm này (qty * price) */}
      <div className="line-right">
        {(item.qty * item.price).toLocaleString()}{" "}
        <span className="currency">đ</span>
      </div>
    </div>
  )
}
