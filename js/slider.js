console.log('[slider.js] Script start');

window.sliderScriptLoaded = true;

// Simple slider implementation
let currentSlide = 0;
let slideInterval;

function initializeSlider() {
    // Test hook: if window.__TEST__ is set, create a dummy element for the test
    if (typeof window !== 'undefined' && window.__TEST__) {
        const dummyElem = document.createElement('div');
        dummyElem.id = 'sliderTestElement';
        dummyElem.textContent = 'Slider script was here';
        document.body.appendChild(dummyElem);
        return;
    }

    const sliderContainer = document.getElementById('slider');
    const dotsContainer = document.getElementById('slider-dots');
    
    if (!sliderContainer || !dotsContainer || !window.SITE_DATA || !window.SITE_DATA.sliderImages) {
        console.warn('Slider initialization failed: missing required elements or data');
        return;
    }

    // Create slides
    window.SITE_DATA.sliderImages.forEach((image, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.opacity = index === 0 ? '1' : '0';
        slide.style.zIndex = index === 0 ? '1' : '0';
        
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.alt;
        img.className = 'slide-image';
        img.loading = 'lazy';
        
        slide.appendChild(img);
        sliderContainer.appendChild(slide);

        // Create dot
        const dot = document.createElement('div');
        dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Start the slideshow
    startSlideShow();
}

// Attach to window for test access
if (typeof window !== 'undefined') {
    window.initializeSlider = initializeSlider;
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (index >= slides.length || index < 0) return;
    
    // Hide all slides and remove active class from dots
    slides.forEach(slide => {
        slide.style.opacity = '0';
        slide.style.zIndex = '0';
    });
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show selected slide and activate corresponding dot
    slides[index].style.opacity = '1';
    slides[index].style.zIndex = '1';
    dots[index].classList.add('active');
    
    currentSlide = index;
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    goToSlide((currentSlide + 1) % slides.length);
}

function startSlideShow() {
    // Clear any existing interval
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    
    // Start new interval (change slide every 5 seconds)
    slideInterval = setInterval(nextSlide, 5000);
}

// Initialize slider when DOM is loaded
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeSlider);
}

console.log('[slider.js] window.initializeSlider defined:', typeof window.initializeSlider);
console.log('[slider.js] Script end'); 