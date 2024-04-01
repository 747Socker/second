import { AxiosInstance } from 'axios';
import {useNavigate} from "react-router-dom";
interface TextInputs {
    whom: string;
    situation: string;
    message: string;
}

export const postTextInputs = async (inputs: TextInputs, axiosInstance: AxiosInstance): Promise<string | null> => {
    try {
        const response = await axiosInstance.post('/bouquet/text-input', inputs);
        const requestId = response.data;
        console.log("텍스트 입력 완료, requestID:", requestId);
        return requestId;
    } catch (error) {
        console.error(error);
        return null;
    }
};