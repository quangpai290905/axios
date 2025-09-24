// src/redux/cart/cartSlice.jsx
import { createSlice } from "@reduxjs/toolkit" 
// 👉 import hàm createSlice để tạo reducer + action một cách ngắn gọn

// State khởi tạo cho giỏ hàng
const initialState = {
  items: [],        // Mảng sản phẩm trong giỏ [{id, name, price, image, qty}]
  totalItems: 0,    // Tổng số lượng sản phẩm trong giỏ
  totalPrice: 0,    // Tổng số tiền trong giỏ
}

// Hàm tiện ích: tìm vị trí sản phẩm trong giỏ theo id
const findIndex = (state, id) => state.items.findIndex(i => i.id === id)

// Tạo slice "cart" với reducers quản lý các hành động
const cartSlice = createSlice({
  name: "cart",          // Tên slice (state.cart)
  initialState,          // State mặc định
  reducers: {
    // Thêm sản phẩm vào giỏ (hoặc tăng số lượng nếu đã có)
    addToCart: (state, action) => {
      const { id, name, price, image } = action.payload
      const idx = findIndex(state, id)
      if (idx === -1) {
        // Nếu sản phẩm chưa có -> thêm mới
        state.items.push({ id, name, price, image, qty: 1 })
      } else {
        // Nếu đã có -> tăng số lượng
        state.items[idx].qty += 1
      }
      state.totalItems += 1
      state.totalPrice += price
    },

    // Alias cho addToCart (giữ tên addItem nếu code cũ dùng)
    addItem: (state, action) => {
      const { id, name, price, image } = action.payload
      const idx = findIndex(state, id)
      if (idx === -1) {
        state.items.push({ id, name, price, image, qty: 1 })
      } else {
        state.items[idx].qty += 1
      }
      state.totalItems += 1
      state.totalPrice += price
    },

    // Tăng số lượng 1 sản phẩm
    increase: (state, action) => {
      const id = action.payload
      const idx = findIndex(state, id)
      if (idx !== -1) {
        state.items[idx].qty += 1
        state.totalItems += 1
        state.totalPrice += state.items[idx].price
      }
    },

    // Giảm số lượng 1 sản phẩm (không giảm dưới 1)
    decrease: (state, action) => {
      const id = action.payload
      const idx = findIndex(state, id)
      if (idx !== -1 && state.items[idx].qty > 1) {
        state.items[idx].qty -= 1
        state.totalItems -= 1
        state.totalPrice -= state.items[idx].price
      }
    },

    // Đặt lại số lượng theo giá trị input
    setQuantity: (state, action) => {
      const { id, qty } = action.payload
      const idx = findIndex(state, id)
      if (idx !== -1) {
        const current = state.items[idx]
        const diff = qty - current.qty // chênh lệch số lượng
        current.qty = qty
        state.totalItems += diff
        state.totalPrice += diff * current.price
      }
    },

    // Xóa 1 sản phẩm khỏi giỏ
    removeItem: (state, action) => {
      const id = action.payload
      const idx = findIndex(state, id)
      if (idx !== -1) {
        const removed = state.items[idx]
        state.totalItems -= removed.qty
        state.totalPrice -= removed.qty * removed.price
        state.items.splice(idx, 1) // xóa khỏi mảng
      }
    },

    // Xóa toàn bộ giỏ hàng
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
    },
  },
})

// Export các action để dùng trong component
export const {
  addToCart,
  addItem,
  increase,
  decrease,
  setQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions

// Export reducer để khai báo trong store
export default cartSlice.reducer
