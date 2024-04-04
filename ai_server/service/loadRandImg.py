import os
import random
from PIL import Image

def load_random_image_from_folder():
    folder_path = './loading_imgs'
    # 주어진 폴더 내의 모든 파일 목록을 가져옴
    files = os.listdir(folder_path)
    # 이미지 파일만 필터링 (확장자를 기준으로 필터링할 수 있음)
    image_files = [f for f in files if f.endswith(('.png', '.jpg', '.jpeg', '.gif'))]
    # 이미지 파일들 중에서 하나를 임의로 선택
    if not image_files:
        return None  # 이미지 파일이 없는 경우 None 반환
    selected_image_file = random.choice(image_files)
    # PIL을 사용하여 이미지 로드
    loadImg = Image.open(os.path.join(folder_path, selected_image_file))
    return loadImg