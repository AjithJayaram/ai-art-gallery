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
    
    try {
        // Simulate AI generation with a placeholder
        // We'll use Lorem Picsum for random images
        const response = await fetch('https://picsum.photos/400/400?random=' + Math.random());
        
        // Create a gallery item div
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        // Create image element
        const img = document.createElement('img');
        img.src = response.url;
        img.alt = prompt;
        
        // Create description element
        const desc = document.createElement('p');
        desc.className = 'image-description';
        desc.textContent = prompt;
        
        // Create download button
        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = 'Download Image';
        downloadBtn.className = 'download-btn';
        downloadBtn.onclick = function() {
            // Create a temporary link to download the image
            const a = document.createElement('a');
            a.href = response.url;
            a.download = 'ai-generated-image.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
        
        // Append elements to gallery item
        galleryItem.appendChild(img);
        galleryItem.appendChild(desc);
        galleryItem.appendChild(downloadBtn);
        
        // Add gallery item to gallery
        gallery.appendChild(galleryItem);
        
    } catch (error) {
        alert('Oops! Something went wrong. Try again!');
    }
    
    // Hide loading
    loading.style.display = 'none';
    
    // Clear input
    document.getElementById('promptInput').value = '';
}
