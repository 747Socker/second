import { AxiosInstance } from 'axios';

interface TextInputs {
    whom: string;
    situation: string;
    message: string;
}

// Axios 인스턴스를 파라미터로 추가합니다.
export const postTextInputs = async (inputs: TextInputs, axiosInstance: AxiosInstance): Promise<void> => {
    try {
        const response = await axiosInstance.post('/bouquet/text-input', inputs);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};
