from diffusers import StableDiffusionXLPipeline, StableDiffusionXLImg2ImgPipeline
import torch
from compel import Compel, ReturnedEmbeddingsType

base = StableDiffusionXLPipeline.from_single_file(
    "epoch15.safetensors", use_safetensors=True,
    torch_dtype=torch.float16,
).to("cuda:0")

# compel = Compel(
#   tokenizer=[base.tokenizer, base.tokenizer_2] ,
#   text_encoder=[base.text_encoder, base.text_encoder_2],
#   returned_embeddings_type=ReturnedEmbeddingsType.PENULTIMATE_HIDDEN_STATES_NON_NORMALIZED,
#   requires_pooled=[False, True]
# )

prompt = "a fresh and beautiful bouquet wraped in paper, red_rose, hydrangea, lily, product image, sunny spring morning, high resolution, 4k image"
#prompt = "(a fresh and beautiful bouquet of flowers wraped in paper.)1.2 (red_rose)1.0, (hydrangea)0.9, (lily)0.9, product image, sunny spring morning. high resolution, 4k image"
negative_prompt ="ugly, deformed, disfigured, poor, blurry, human, hand, finger"
#prompt = "(hyacinth)1.1, (pink rose)1.1, (purple tulip)1.1, (a bouquet wraped in paper)1.0, (simple background, white background, high resolution, 4k image)1.0"

# conditioning, pooled = compel(prompt)
# negative_conditioning, negative_pooled = compel(negative_prompt)

# generate image
# image = base(prompt_embeds=conditioning, pooled_prompt_embeds=pooled,
#              negative_prompt_embeds=negative_conditioning, negative_pooled_prompt_embeds=negative_pooled,
             
#              height=1024,
#              width=1024,
             
#              num_inference_steps=35
#             ).images[0]

image = base(prompt=prompt, negative_prompt=negative_prompt,
             
             height=1024,
             width=1024,
             
             num_inference_steps=35,

            ).images[0]
            

image.save("test.png")