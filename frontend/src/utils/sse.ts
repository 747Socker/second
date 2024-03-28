import { bouquetStore } from '../stores/bouquetStore';

interface SSEEventCallback {
    (data: any): void;
}

interface SSECallbacks {
    onOpen?: () => void;
    onError?: (error: Event) => void;
    events?: {
        [eventType: string]: SSEEventCallback;
    };
}

const setupSSE = (callbacks: SSECallbacks) => {
    console.log("sse 시작");
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const sseUrl = `${apiUrl}/bouquet/subscribe`;
    const eventSource = new EventSource(sseUrl);

    eventSource.onopen = () => {
        console.log("SSE 연결 상태:", eventSource.readyState);
        callbacks.onOpen?.();
    };

    // 이벤트 유형별로 콜백 함수를 등록
    if (callbacks.events) {
        for (const eventType in callbacks.events) {
            const eventCallback = callbacks.events[eventType];
            eventSource.addEventListener(eventType, (event) => {
                console.log(`${eventType} 메시지 수신`);
                const data = JSON.parse(event.data);
                console.log('서버 데이터', data);
                eventCallback(data);
            });
        }
    }

    eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        callbacks.onError?.(error);
        eventSource.close();
    };
};

export default setupSSE;
