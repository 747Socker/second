import os

from PIL import Image
import io

import boto3

def upload(img = Image.new('RGB', (1024, 1024), 'black'), fileName = 'test'):

    s3 = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
    aws_secret_access_key=os.getenv('AWS_SECRET_KEY')
    )

    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()

    s3_file_path = f'{fileName}.png'

    bucket_name = os.getenv('AWS_BUCKET_NAME')
    region_name = os.getenv('AWS_REGION_NAME')

    s3.upload_fileobj(io.BytesIO(img_byte_arr), bucket_name, s3_file_path)


    url = f"https://{bucket_name}.s3.{region_name}.amazonaws.com/{s3_file_path}"
    return url