import toml

flowerData = toml.load('./flowerData.toml')
kor_flowerNames = flowerData['kor_flowerNames']
eng_flowerNames = flowerData['eng_flowerNames']

print(kor_flowerNames[5])