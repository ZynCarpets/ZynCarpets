/**
 * Initializes the "Why Choose Zyn?" features section.
 * Fetches feature data from window.SITE_DATA.features.
 */
function initializeFeatures() {
    console.log('[features] Initializing features section...');
    
    const featuresGrid = document.querySelector('#features-grid');
    if (!featuresGrid) {
        console.warn('[features] Features grid (#features-grid) not found. Skipping features initialization.');
        return;
    }

    if (!window.SITE_DATA || !window.SITE_DATA.features || window.SITE_DATA.features.length === 0) {
        console.warn('[features] SITE_DATA.features not found or empty. Skipping features initialization.');
        featuresGrid.innerHTML = '<p>No features available at the moment.</p>';
        return;
    }
    
    const features = window.SITE_DATA.features;
    console.log('[features] Found', features.length, 'features to initialize');

    // Clear existing content
    featuresGrid.innerHTML = '';

    features.forEach((feature, index) => {
        const featureCard = document.createElement('div');
        featureCard.className = 'feature';
        
        featureCard.innerHTML = `
            <i class="${feature.icon}"></i>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        `;
        
        featuresGrid.appendChild(featureCard);
        console.log(`[features] Added feature ${index + 1}`);
    });
    
    console.log('[features] Features initialization complete');
}

// Make the function available globally
window.initializeFeatures = initializeFeatures; 