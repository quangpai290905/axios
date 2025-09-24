// src/components/ProductList.jsx
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { products } from "../data/products";
import { addToCart } from "../redux/cart/cartSlice";

const formatVND = (v) =>
  Number(v || 0).toLocaleString("vi-VN", { maximumFractionDigits: 0 });

export default function ProductList() {
  const dispatch = useDispatch();

  // Tránh tạo hàm mới mỗi lần render
  const handleAdd = useCallback(
    (p) => {
      // Nếu slice của bạn tự set qty mặc định là 1 thì giữ nguyên dòng dưới.
      // Nếu cần ép qty: dispatch(addToCart({ ...p, qty: 1 }))
      dispatch(addToCart(p));
    },
    [dispatch]
  );

  // Ảnh fallback khi bị lỗi link
  const onImgError = (e) => {
    e.currentTarget.src =
      "https://via.placeholder.com/300x300?text=No+Image";
  };

  return (
    <section aria-labelledby="product-list-title">
      <h2 id="product-list-title" className="section-title">
        Danh sách sản phẩm
      </h2>

      <div className="products">
        {products.map((p) => (
          <div key={p.id} className="card">
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              onError={onImgError}
            />

            <div className="title">{p.name}</div>

            <div className="price">
              {formatVND(p.price)} <span className="currency">đ</span>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              aria-label={`Thêm ${p.name} vào giỏ`}
              onClick={() => handleAdd(p)}
            >
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
