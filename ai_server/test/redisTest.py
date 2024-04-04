
from dotenv import load_dotenv
import os

import redis
import threading
import json

load_dotenv()

host = os.getenv('REDIS_HOST')
port = os.getenv('REDIS_PORT')
password = os.getenv('REDIS_PASSWORD')

rd = redis.Redis(host=host, port=port, password=password, health_check_interval=20)

print(rd.get('allFlowers::SimpleKey []'))
