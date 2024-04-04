// import { useEffect } from 'react';
// import { useLocalAxios } from '../utils/axios.ts';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../stores/auth.ts';
//
// export const KakaoCallback = () => {
//     const navigate = useNavigate();
//     const authStore = useAuthStore();
//     const localAxios = useLocalAxios(false);
//
//     useEffect(() => {
//         const code = new URL(document.location.toString()).searchParams.get('code');
//         console.log(code);
//         if (authStore.accessToken) {
//             navigate('/index');
//             return;
//         }
//
//         localAxios
//             .post('/member/login', null, {
//                 params: { code },
//             })
//             .then((response) => {
//                 authStore.setAuth(response.data);
//                 navigate('/index');
//             })
//             .catch((e) => {
//                 //navigate('/');
//                 console.log(e);
//                 navigate('/');
//             });
//     }, []);
//
//     return <></>;
// };
import { useEffect } from 'react';
import { useLocalAxios } from '../utils/axios.ts';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.ts';

export const KakaoCallback = () => {
    const navigate = useNavigate();
    const authStore = useAuthStore();
    const localAxios = useLocalAxios(false);

    useEffect(() => {
        const code = new URL(document.location.toString()).searchParams.get('code');
        if (authStore.accessToken) {
            navigate('/index');
            return;
        }

        if (code) {
            localAxios
                .get('/auth/oauth2/login/kakao', {params: {"code" : code}})
                .then((response) => {
                    authStore.setAuth(response.data);
                    console.log("로그인 완료");
                    navigate('/index');
                })
                .catch((e) => {
                    console.error(e);
                   navigate('/');
                });
        } else {
            console.error("Authorization code not found.");
            navigate('/');
        }
    }, []);

    return <></>;
};
