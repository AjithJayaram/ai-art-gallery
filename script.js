// This is where the AI magic happens!
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
        // For now, we'll use a placeholder service
        // In the future, we'll connect to real AI!
        const response = await fetch('https://picsum.photos/400/400');
        
        // Create image element
        const img = document.createElement('img');
        img.src = response.url;
        img.alt = prompt;
        
        // Add to gallery
        gallery.appendChild(img);
        
    } catch (error) {
        alert('Oops! Something went wrong. Try again!');
    }
    
    // Hide loading
    loading.style.display = 'none';
    
    // Clear input
    document.getElementById('promptInput').value = '';
}