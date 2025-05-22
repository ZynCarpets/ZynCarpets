// Initialize services
function initializeServices() {
    console.log('[services] Initializing services...');
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) {
        console.warn('[services] Services grid not found');
        return;
    }
    
    if (!window.SITE_DATA || !window.SITE_DATA.services) {
        console.error('[services] SITE_DATA or services not available');
        return;
    }
    
    const services = window.SITE_DATA.services;
    console.log('[services] Found', services.length, 'services to initialize');
    
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service';
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <div class="service-content">
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            </div>
            <div class="service-footer">
                <a href="#contact" class="service-link">Learn More</a>
            </div>
        `;
        servicesGrid.appendChild(serviceCard);
    });
    
    console.log('[services] Services initialization complete');
}

// Make the function available globally
window.initializeServices = initializeServices; 