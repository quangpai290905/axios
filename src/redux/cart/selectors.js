// Lấy toàn bộ danh sách sản phẩm trong giỏ
export const selectCartItems = state => state.cart.items

// Tính tổng số lượng sản phẩm trong giỏ
export const selectTotalItems = state =>
  state.cart.items.reduce((sum, i) => sum + i.qty, 0)

// Tính tổng giá trị (tổng tiền) của giỏ hàng
export const selectTotalPrice = state =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.qty, 0)
