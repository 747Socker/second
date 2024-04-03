import { AxiosInstance } from "axios";

export const postBouquetConfirm = async (axiosInstance: AxiosInstance): Promise<void> => {
    try {
        const response = await axiosInstance.post('/bouquet/confirmed');
       // console.log("confirmed");
    }catch (e){
       // console.log("confirm 실패");
        console.error(e);
    }
};