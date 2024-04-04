import functools
import json
from diffusers import StableDiffusionXLPipeline, StableDiffusionXLImg2ImgPipeline
from service.loadRandImg import load_random_image_from_folder
from service.mergeImg import merge_images_with_opacity
import torch
import os
from PIL import Image

from Dto import BouquetUrlTransferDto
from service.publish import publish
from service.upload import upload
import time

STEP = 28

def latents_to_rgb(latents):
    weights = (
        (60, -60, 25, -70),
        (60,  -5, 15, -50),
        (60,  10, -5, -35)
    )

    weights_tensor = torch.t(torch.tensor(weights, dtype=latents.dtype).to(latents.device))
    biases_tensor = torch.tensor((150, 140, 130), dtype=latents.dtype).to(latents.device)
    rgb_tensor = torch.einsum("...lxy,lr -> ...rxy", latents, weights_tensor) + biases_tensor.unsqueeze(-1).unsqueeze(-1)
    image_array = rgb_tensor.clamp(0, 255)[0].byte().cpu().numpy()
    image_array = image_array.transpose(1, 2, 0)

    return Image.fromarray(image_array)

def decode_tensors(pipe, step, timestep, callback_kwargs, preset_img, requestId, publisher):
    latents = callback_kwargs["latents"]
    # image = callback_kwargs["image"]

    image = latents_to_rgb(latents)

    opacity = step / STEP * 100
    preset_occ = 100 - opacity

    middle_img = merge_images_with_opacity(image, opacity, preset_img, preset_occ)

    url = upload(img=middle_img, fileName=f'middle/{requestId}_{step}_{time.strftime("%H%M%S")}')
    publish(requestId, url, False, publisher)

    return callback_kwargs

def imgGenerate(flowers=['res_rose, hydrangea, lily'], threadNum=-1, requestId=-1, pipeline=None, publisher=None):
  prompt = f"a fresh and beautiful bouquet wraped in paper. {flowers[0] if len(flowers) > 0 else ''}, {flowers[1] if len(flowers) > 1 else ''}, {flowers[2] if len(flowers) > 2 else ''}, product image, studio shot, sunny spring morning, realistic photo, highres, 4k image, wallpaper, perspective"
  negative_prompt ="lowres, ugly, deformed, disfigured, poor, blurry, human, hand, finger"

  preset_img = load_random_image_from_folder()

  callback_function = functools.partial(decode_tensors, preset_img=preset_img, requestId=requestId, publisher=publisher)

  # generate image
  image = pipeline(
              prompt = prompt,
              negative_prompt = negative_prompt,
              
              height=768,
              width=768,
              
              num_inference_steps=STEP,

              callback_on_step_end=callback_function,
              callback_on_step_end_tensor_inputs=["latents"]
              #callback_on_step_end_tensor_inputs=["image"]

              ).images[0]


  return image