import api from './axios';

export async function fetchProducts() {
  // ví dụ dummyjson: lấy 20 sản phẩm đầu
  const { data } = await api.get('/products?limit=20');
  // chuẩn hoá thành {id, name, price, image}
  return (data.products || []).map(p => ({
    id: String(p.id),
    name: p.title,
    price: Number(p.price) * 1000,  // tuỳ backend, bạn đổi theo đơn vị
    image: p.thumbnail || (p.images && p.images[0]) || ''
  }));
}
