// Initialize services
function initializeServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) {
        console.warn('Services grid not found');
        return;
    }
    const services = window.SITE_DATA.services;
    
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <i class="${service.icon}"></i>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        servicesGrid.appendChild(serviceCard);
    });
} 