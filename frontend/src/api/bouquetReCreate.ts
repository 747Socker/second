import { AxiosInstance } from 'axios';

export const postRegenerateInputs = async (inputs: string[], axiosInstance: AxiosInstance): Promise<void> => {
    try {
        const response = await axiosInstance.post('/bouquet/re-generate', inputs );
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};
