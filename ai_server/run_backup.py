
from dotenv import load_dotenv
import os

import redis
import threading
import json

import toml

from Dto import FlowerUrlTransferDto, BouquetUrlTransferDto
from service.imgGenerate import imgGenerate
from service.upload import upload


load_dotenv()

host = os.getenv('REDIS_HOST')
port = os.getenv('REDIS_PORT')
password = os.getenv('REDIS_PASSWORD')

rd = redis.Redis(host=host, port=port, password=password, health_check_interval=20)

print(rd.ping())

subscriber = rd.pubsub()
subscriber.subscribe('ch1')
publisher = rd

for message in subscriber.listen():
    if message['type'] == 'message':
        inputDto = json.loads(message['data'].decode())
        flowersId = inputDto['flowersId']
        requestId = inputDto['requestId']

        print("############################")
        print(flowersId)
        print(requestId)

        flowerData = toml.load('./flowerData.toml')
        kor_flowerNames = flowerData['kor_flowerNames']
        eng_flowerNames = flowerData['eng_flowerNames']

        #flowersId와 매칭되는 꽃 종류를 allFlowers에서 찾는다.
        flowers = []
        
        for i in flowersId[1]:
            idx = i-1
            flowers.append(eng_flowerNames[idx])

        print(flowers)

        #꽃 종류를 이용하여 꽃 이미지를 생성한다.
        image = imgGenerate(flowers)

        #생성된 꽃 이미지를 s3 저장소에 업로드한다.
        url = upload(img=None)

        #요청 id와 생성된 꽃이미지 주소를 반환한다.
        testDto = BouquetUrlTransferDto()
        testDto.requestId = requestId
        testDto.bouquetUrl = url
        publisher.publish('ch2', json.dumps(testDto.__dict__))