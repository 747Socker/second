import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const discon = async (): Promise<void> => {
    try {
        const response = await api.post('/test/removeSseConnection');
        console.log("removeSseConnection: ",response.data);
    } catch (error) {
        console.error(error);
    }
};