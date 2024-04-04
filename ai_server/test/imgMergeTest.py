from PIL import Image

def merge_images_with_opacity(imageA, opacityA, imageB, opacityB):
    # 이미지A와 이미지B의 투명도를 0~255 범위로 조정
    alphaA = int(opacityA * 255 / 100)
    alphaB = int(opacityB * 255 / 100)
    
    # 이미지A와 이미지B를 RGBA 모드로 변환 (투명도 채널 추가)
    imageA = imageA.convert("RGBA")
    imageB = imageB.convert("RGBA")
    
    # 두 이미지의 크기가 다를 경우, 이미지B의 크기를 이미지A에 맞춤
    if imageA.size != imageB.size:
        imageB = imageB.resize(imageA.size)
    
    # 이미지A와 이미지B에 각각의 투명도 적용
    dataA = []
    for item in imageA.getdata():
        dataA.append(item[:3] + (int(item[3] * alphaA / 255),))
    imageA.putdata(dataA)
    
    dataB = []
    for item in imageB.getdata():
        dataB.append(item[:3] + (int(item[3] * alphaB / 255),))
    imageB.putdata(dataB)
    
    # 두 이미지 합치기
    merged_image = Image.alpha_composite(imageA, imageB)
    
    # 결과 이미지 반환
    return merged_image

img1 = loadImg = Image.open('./loading_imgs/img1.png')
img2 = Image.open('./loading_imgs/img2.png')

m_img = merge_images_with_opacity(img1, 40, img2, 60)
m_img.show()