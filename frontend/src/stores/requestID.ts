import {create} from 'zustand'

interface RequestState {
    requestId: string | null;
    setRequestId: (id: string) => void;
}

export const useRequestStore = create<RequestState>((set) => ({
    requestId: null, // 초기 상태는 null 또는 빈 문자열 등으로 설정
    setRequestId: (id: string) => set({ requestId: id }),
}));