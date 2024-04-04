// src/utils/authHelpers.ts
import { useAuthStore } from '../stores/auth.ts';

export const logout = () => {
    const { clearAuth } = useAuthStore();
    clearAuth();
    // 쿠키 삭제 로직 추가 가능
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};
