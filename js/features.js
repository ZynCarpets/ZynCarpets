// Initialize features
function initializeFeatures() {
    const featuresGrid = document.getElementById('features-grid');
    if (!featuresGrid) {
        console.warn('Features grid not found');
        return;
    }
    const features = window.SITE_DATA.features;
    
    features.forEach(feature => {
        const featureCard = document.createElement('div');
        featureCard.className = 'feature';
        featureCard.innerHTML = `
            <i class="${feature.icon}"></i>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        `;
        featuresGrid.appendChild(featureCard);
    });
} 