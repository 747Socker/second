// import Axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../stores/auth.ts';
//
// const useLocalAxios = (isAuth: boolean = true): AxiosInstance => {
//     const { accessToken, setAccessToken, clearAuth } = useAuthStore();
//     const navigate = useNavigate();
//
//     const instance = Axios.create({
//         baseURL: import.meta.env.VITE_API_BASE_URL,
//     });
//
//     // 요청 인터셉터: 인증이 필요한 경우, 헤더에 accessToken 추가
//     if (isAuth) {
//         instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//             if (accessToken) {
//                 config.headers = config.headers || {};
//                 config.headers.Authorization = `Bearer ${accessToken}`;
//             }
//             return config;
//         });
//     }
//
//     // 응답 인터셉터: 401 Unauthorized 에러 처리
//     instance.interceptors.response.use(
//         (response) => response,
//         async (error) => {
//             if (error.response && error.response.status === 401) {
//                 // 로그인 페이지로 리다이렉트하거나 적절한 처리를 수행
//                 clearAuth(); // 상태 초기화
//                 navigate('/login');
//                 return Promise.reject(error);
//             }
//
//             // 다른 HTTP 에러 처리
//             return Promise.reject(error);
//         },
//     );
//
//     return instance;
// };
//
// export { useLocalAxios };
