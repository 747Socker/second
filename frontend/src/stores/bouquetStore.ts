import {create, SetState, GetState } from 'zustand';

interface FlowerDto {
    flowerId: number;
    name: string;
    color: string;
    meaning: string;
    imgUrl: string;
}

interface BouquetState {
    bouquetUrl: string;
    apiUsageCount: number;
    usedFlower: number[];
    recommendByMeaning: number[];
    recommendByPopularity: number[];
    allFlowers: FlowerDto[];
    setBouquetData: (data: BouquetUpdateData) => void;
}

interface BouquetUpdateData {
    bouquetUrl?: string;
    apiUsageCount?: number;
    usedFlower?: number[];
    recommendByMeaning?: number[];
    recommendByPopularity?: number[];
    allFlowers?: FlowerDto[];
}

export const bouquetStore = create<BouquetState>((set: SetState<BouquetState>, get: GetState<BouquetState>) => ({
    bouquetUrl: '',
    apiUsageCount: 0,
    usedFlower: [],
    recommendByMeaning: [],
    recommendByPopularity: [], //top7 사용 중복 체크 필요
    allFlowers: [
    ],

    setBouquetData: (data: BouquetUpdateData) => {
        const currentState = get();
        set({
            ...currentState,
            ...data,
            allFlowers: data.allFlowers ? data.allFlowers : currentState.allFlowers, // allFlowers만 현재 상태로 유지
        });
    },
}));
