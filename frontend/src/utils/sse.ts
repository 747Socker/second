
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

const setupSSE = (requestId: string, callbacks: SSECallbacks) => {
    console.log("sse 시작");
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const sseUrl = `${apiUrl}bouquet/subscribe?requestId=${requestId}`;
    console.log("sseurl", sseUrl);
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
                console.log("수신된 데이터: ", event.data);
                let data;
                if (eventType === 'middleImageSendEvent') {
                    data = event.data; // raw string 데이터 그대로 사용
                } else {
                    data = JSON.parse(event.data); // 기존 JSON 파싱 유지
                }
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
