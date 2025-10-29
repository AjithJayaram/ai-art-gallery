// Real AI Image Generator!
async function generateImage() {
    const prompt = document.getElementById('promptInput').value;
    const loading = document.getElementById('loading');
    const gallery = document.getElementById('gallery');
    
    if (!prompt) {
        alert('Please describe what you want to create!');
        return;
    }
    
    // Show loading
    loading.style.display = 'block';
    loading.textContent = '🤖 AI is painting your masterpiece...';
    
    try {
        // Using Hugging Face's Stable Diffusion - FREE!
        const response = await fetch(
            'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer hf_your_token_here', // We'll get this free token next!
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputs: prompt }),
            }
        );
        
        if (!response.ok) {
            throw new Error('AI is waking up... try again in a moment!');
        }
        
        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        
        // Create image card
        const imageCard = document.createElement('div');
        imageCard.className = 'image-card';
        
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = prompt;
        
        const description = document.createElement('p');
        description.textContent = prompt;
        
        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = '📥 Download';
        downloadBtn.className = 'download-btn';
        downloadBtn.onclick = () => downloadImage(imgUrl, prompt);
        
        imageCard.appendChild(img);
        imageCard.appendChild(description);
        imageCard.appendChild(downloadBtn);
        
        // Add to gallery
        gallery.appendChild(imageCard);
        
    } catch (error) {
        // Fallback to cute placeholder images if AI fails
        createPlaceholderImage(prompt, gallery);
    }
    
    loading.style.display = 'none';
    document.getElementById('promptInput').value = '';
}

// Download function
function downloadImage(url, prompt) {
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-art-${prompt.substring(0, 20)}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Fallback function with cute placeholder service
function createPlaceholderImage(prompt, gallery) {
    const imageCard = document.createElement('div');
    imageCard.className = 'image-card';
    
    const img = document.createElement('img');
    img.src = `https://picsum.photos/400/400?random=${Math.random()}`;
    img.alt = prompt;
    
    const description = document.createElement('p');
    description.textContent = prompt + " 🌟 (AI is loading...)";
    
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = '📥 Download';
    downloadBtn.className = 'download-btn';
    
    imageCard.appendChild(img);
    imageCard.appendChild(description);
    imageCard.appendChild(downloadBtn);
    gallery.appendChild(imageCard);
}
