interface Bouquet {
    bouquetId: number;
    whom: string;
    situation: string;
    message: string;
    imageUrl: string;
    flowerIds: number[];
    memberId: number;
}

interface BouquetSliceResponse {
    slice: {
        pagable: {
            page: number;
            size: number;
        };
        first: boolean;
        last: boolean;
        content: Bouquet[];
    };
    lastIndex: number;
}
export type {BouquetSliceResponse, Bouquet};