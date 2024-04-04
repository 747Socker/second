import json
import time
import toml
from Dto import BouquetUrlTransferDto
from service.imgGenerate import imgGenerate
from service.publish import publish
from service.upload import upload

from diffusers import StableDiffusionXLPipeline, StableDiffusionXLImg2ImgPipeline
import torch
import os

def worker(work_queue, publisher, threadNum):
    print("파이프라인 준비중..")
    pipeline = StableDiffusionXLPipeline.from_single_file(
      os.getenv('SD_MODEL_NAME'), use_safetensors=True,
      torch_dtype=torch.float16,
    ).to("cuda:"+str(threadNum))

    print("파이프라인 준비 완료")
    while True:
        message = work_queue.get()  # 큐에서 작업을 하나 가져옴
        if message['type'] == 'message':
            inputDto = json.loads(message['data'].decode())
            flowersId = inputDto['flowersId']
            requestId = inputDto['requestId']

            print("############################")
            print('현재시각; ' + time.strftime('%H:%M:%S'))
            print(flowersId)
            print(requestId)

            flowerData = toml.load('./flowerData.toml')
            kor_flowerNames = flowerData['kor_flowerNames']
            eng_flowerNames = flowerData['eng_flowerNames']

            flowers = []
            for i in flowersId[1]:
                idx = i-1
                flowers.append(eng_flowerNames[idx])

            print(flowers)

            image = imgGenerate(flowers, threadNum, requestId, pipeline, publisher)

            url = upload(img=image, fileName=f'complete/{requestId}_{time.strftime("%H%M%S")}')

            #url = upload()

            publish(requestId, url, True, publisher)

        work_queue.task_done()