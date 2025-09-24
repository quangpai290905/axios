// src/redux/store.jsx
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/cartSlice'

/**
 * === Hàm load/save state vào localStorage ===
 * loadState(): Đọc state từ localStorage -> khôi phục sau khi reload
 * saveState(): Ghi state xuống localStorage -> để lần sau dùng lại
 */
function loadState() {
  try {
    const serialized = localStorage.getItem("reduxState")
    if (!serialized) return undefined   // không có thì trả undefined để dùng initialState mặc định
    return JSON.parse(serialized)       // parse JSON thành object
  } catch {
    return undefined
  }
}

function saveState(state) {
  try {
    const serialized = JSON.stringify(state)
    localStorage.setItem("reduxState", serialized)
  } catch {
    // nếu lỗi (vd: quota đầy) thì bỏ qua
  }
}

/**
 * === throttle(): Giới hạn tần suất gọi saveState ===
 * Tránh việc user bấm +/− liên tục -> gọi localStorage.setItem liên tục -> lag
 * => Chỉ cho phép save tối đa mỗi 500ms
 */
function throttle(fn, wait = 500) {
  let last = 0
  let timer
  let lastArgs
  return (...args) => {
    const now = Date.now()
    const remaining = wait - (now - last)
    lastArgs = args
    if (remaining <= 0) {
      last = now
      fn(...args)   // gọi ngay nếu đã đủ thời gian
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = Date.now()
        fn(...lastArgs) // gọi lần cuối sau khi dừng bấm
      }, remaining)
    }
  }
}

// 1) Đọc state đã lưu trong localStorage (nếu có)
const preloadedState = loadState() || undefined

// 2) Tạo Redux store, nạp preloadedState để reload không mất giỏ
export const store = configureStore({
  reducer: {
    cart: cartReducer,   // state.cart quản lý bởi cartSlice
  },
  preloadedState,
})

// 3) Mỗi khi state thay đổi -> save lại giỏ hàng xuống localStorage (dùng throttle)
const persistCart = throttle(() => {
  const { cart } = store.getState()
  // chỉ lưu phần cart (tránh lưu thừa các state khác)
  saveState({ cart })
}, 500)

store.subscribe(persistCart)

// (tuỳ chọn) Export selector tiện dùng
export const selectCartState = (state) => state.cart
