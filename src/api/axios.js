// import thư viện axios để gọi API HTTP (GET, POST, PUT, DELETE, ...)
import axios from 'axios';

//  Tạo một instance axios riêng (tách biệt với axios mặc định)
// Ưu điểm: có thể cấu hình chung (baseURL, timeout, headers, interceptor)
// => Giúp dự án đồng bộ, dễ bảo trì
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL gốc cho mọi request (lấy từ file .env)
  timeout: 10000,                        // Giới hạn thời gian chờ (10 giây)
});

/**
 *  Interceptor cho request (chạy trước khi gửi request đi server)
 * - Dùng để gắn token xác thực, header chung, hoặc log request
 */
api.interceptors.request.use((config) => {
  //  Ví dụ: cơ chế login + JWT token
  // const token = localStorage.getItem('token');     // lấy token lưu trong localStorage
  // if (token) config.headers.Authorization = `Bearer ${token}`; // gắn vào header Authorization

  return config; // luôn phải return config đã chỉnh sửa (nếu không thì request không được gửi đi)
});

/**
 *  Interceptor cho response (chạy sau khi nhận phản hồi từ server)
 * - Dùng để xử lý lỗi chung (401 unauthorized, 403 forbidden, 500 server error...)
 * - Có thể format lại response trước khi trả về cho component
 */
api.interceptors.response.use(
  (res) => res, // Nếu thành công: trả về nguyên response (bạn có thể return res.data nếu chỉ cần dữ liệu)
  (err) => {
    // Nếu thất bại: có thể xử lý lỗi tập trung ở đây
    // Ví dụ: nếu token hết hạn -> chuyển hướng login
    // if (err.response?.status === 401) {
    //   window.location.href = '/login';
    // }

    return Promise.reject(err); // Ném lỗi để nơi gọi .catch() có thể bắt
  }
);

// Export instance đã cấu hình để dùng ở mọi nơi
// thay vì import axios trực tiếp -> import api (có sẵn baseURL, interceptor)
export default api;
