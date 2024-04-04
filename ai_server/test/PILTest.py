from PIL import Image
import toml
import random

wrap = Image.open('wrap.png')
wrapInfo = toml.load('wrap.toml')

#서브 꽃 1 배치

#서브 꽃 2 배치

#메인 꽃 배치
flower = Image.open('red_rose_1.png')
flowerInfo = toml.load('red_rose_1.toml')
change = wrapInfo['ratio'] / flowerInfo['ratio']

flower = flower.resize((int(flower.width * change), int(flower.height * change)), Image.LANCZOS)

main_cords = wrapInfo['main_cords']

for cord in main_cords:
    paste_location = (cord[0] - int(flower.width / 2), cord[1] - int(flower.height / 2))

    if flower.mode == 'RGBA':
        alpha = flower.split()[3]
        wrap.paste(flower, paste_location, mask=alpha)
    else:
        wrap.paste(flower, paste_location)

wrap.save('test.png')