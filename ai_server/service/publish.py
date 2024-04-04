

import json
from Dto import BouquetUrlTransferDto


def publish(requestId, url, finish, publisher):
    testDto = BouquetUrlTransferDto()
    testDto.requestId = requestId
    testDto.bouquetUrl = url
    testDto.finish = finish
    print(testDto.__dict__)
    publisher.publish('ch2', json.dumps(testDto.__dict__))