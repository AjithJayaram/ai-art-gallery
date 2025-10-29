// Use Stable Diffusion via a different free service
const response = await fetch(
    'https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sk-this-is-a-free-trial-key' // Free trial key
        },
        body: JSON.stringify({
            text_prompts: [{ text: prompt }],
            cfg_scale: 7,
            height: 512,
            width: 512,
            steps: 30,
            samples: 1,
        })
    }
);
