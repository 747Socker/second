from dotenv import load_dotenv
import os
import redis
import threading
import queue
from worker import worker  # worker 함수 import
import torch
from diffusers import StableDiffusionXLPipeline, StableDiffusionXLImg2ImgPipeline

load_dotenv()

host = os.getenv('REDIS_HOST')
port = os.getenv('REDIS_PORT')
password = os.getenv('REDIS_PASSWORD')

rd = redis.Redis(host=host, port=port, password=password, health_check_interval=20)

print("redis 연결상태", rd.ping())

# 작업 큐 생성
work_queue = queue.Queue()

# 워커 쓰레드 풀 생성 및 시작
for i in range(torch.cuda.device_count()):  # 4개의 워커 쓰레드 생성, 필요에 따라 수를 조정할 수 있음

    t = threading.Thread(target=worker, args=(work_queue, rd, i))  # work_queue와 publisher(rd)를 인자로 전달
    t.daemon = True
    t.start()

subscriber = rd.pubsub()
subscriber.subscribe('ch1')

for message in subscriber.listen():
    if message['type'] == 'message':
        print("############################")
        print("요청이 들어옴")
        print(message['data'].decode())
    work_queue.put(message)  # 작업 큐에 메시지 추가