import { AxiosInstance } from 'axios';

// 다운로드 요청 함수
export const downloadBouquetImage = async (bouquetId: number, axiosInstance: AxiosInstance): Promise<void> => {
    try {
        console.log(bouquetId);
        await axiosInstance.post('/bouquet/list/download', { bouquetId });
        console.log("다운로드 요청 성공");
    } catch (error) {
        console.error("다운로드 요청 오류:", error);
    }
};
