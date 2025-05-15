let currentSlide = 0; // Manages the currently active slide index
let slideInterval; // Holds the interval ID for the slideshow

/**
 * Initializes the image slider with touch support and navigation
 * Creates slides and navigation dots based on configuration
 */
function initializeSlider() {
    console.log('Initializing image slider...');
    const slider = document.getElementById('slider');
    const dotsContainer = document.getElementById('slider-dots');
    let touchStartX = 0;
    let touchEndX = 0;
    
    const sliderImages = window.SITE_DATA.sliderImages;
    if (!slider || !dotsContainer || !sliderImages || sliderImages.length === 0) {
        console.warn('Slider elements not found or no images; aborting slider initialization.');
        return;
    }
    
    // Create slides from SITE_DATA
    console.log(`Creating ${sliderImages.length} slides...`);
    slider.innerHTML = ''; // Clear existing slides if any (for re-initialization scenarios)
    dotsContainer.innerHTML = ''; // Clear existing dots

    sliderImages.forEach((image, index) => {
        const slide = document.createElement('div');
        // Initial active state will be set by global goToSlide(0) later
        slide.className = 'slide'; 
        
        const img = document.createElement('img');
        // Initial src and lazy loading will be handled by goToSlide
        img.dataset.src = image.url; 
        img.alt = image.alt;
        img.loading = 'lazy'; // Standard attribute, browser handles if supported
        img.className = 'slide-image';
        slide.appendChild(img);
        slider.appendChild(slide);
        
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.addEventListener('click', () => goToSlide(index)); // Calls global goToSlide
        dotsContainer.appendChild(dot);
    });

    // Initialize the first slide view
    if (sliderImages.length > 0) {
        goToSlide(0); // Set initial slide using global function
    }

    // Add intersection observer for lazy loading (if not fully handled by goToSlide)
    // This observer seems to be for images not yet active, which is fine.
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src && !img.src) { // Only load if src is not already set
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    document.querySelectorAll('#slider .slide img.slide-image[data-src]').forEach(img => {
        lazyLoadObserver.observe(img);
    });

    // Touch event handlers for mobile swipe support
    console.log('Setting up touch event handlers...');
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        console.log('Touch start:', touchStartX);
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        console.log('Touch end:', touchEndX);
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50; 
        const swipeDistance = touchEndX - touchStartX;
        console.log('Swipe distance:', swipeDistance);
        let newSlideIndex = currentSlide; // Use global currentSlide

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                console.log('Swipe right detected - going to previous slide');
                newSlideIndex = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
            } else {
                console.log('Swipe left detected - going to next slide');
                newSlideIndex = (currentSlide + 1) % sliderImages.length;
            }
            goToSlide(newSlideIndex); // Calls global goToSlide
        } else {
            console.log('Swipe distance too small, ignoring');
        }
    }
}

/**
 * Navigates to a specific slide by its index
 * @param {number} slideIndex - The index of the slide to navigate to
 */
function goToSlide(slideIndex) {
    const slider = document.getElementById('slider');
    const slides = slider ? slider.getElementsByClassName('slide') : [];
    const dots = document.getElementById('slider-dots') ? document.getElementById('slider-dots').getElementsByClassName('dot') : [];
    const sliderImages = window.SITE_DATA.sliderImages;

    if (!slides.length || !dots.length || !sliderImages || sliderImages.length === 0) {
        console.warn('goToSlide: Slider, slides, dots, or images not found.');
        return;
    }
    
    // Ensure slideIndex is within bounds
    const numSlides = sliderImages.length;
    slideIndex = (slideIndex % numSlides + numSlides) % numSlides; // Handles negative indices and overflow

    console.log(`goToSlide: Navigating to slide ${slideIndex}`);

    // Update slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
        const img = slides[i].querySelector('.slide-image');
        if (img && i !== slideIndex && img.src) { // Optionally unload non-active images to save memory
            // img.removeAttribute('src'); // Consider if this is desired behavior
        }
    }
    slides[slideIndex].classList.add('active');
    const activeImage = slides[slideIndex].querySelector('.slide-image');
    if (activeImage && activeImage.dataset.src && !activeImage.src) {
        activeImage.src = activeImage.dataset.src;
        activeImage.removeAttribute('data-src');
    }
    
    // Update dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    dots[slideIndex].classList.add('active');

    currentSlide = slideIndex;
    console.log(`goToSlide: Current slide is now ${currentSlide}`);

    // Optional: Restart slideshow timer if it's active
    if (slideInterval) {
        stopSlideShow();
        startSlideShow();
    }
}

/**
 * Advances to the next slide in the sequence
 */
function nextSlide() {
    const sliderImages = window.SITE_DATA.sliderImages;
    if (!sliderImages || sliderImages.length === 0) return;
    goToSlide((currentSlide + 1) % sliderImages.length);
}

/**
 * Starts the automatic slideshow
 */
function startSlideShow() {
    console.log('Starting slideshow...');
    stopSlideShow(); // Clear any existing interval
    const slideDuration = window.SITE_DATA.sliderSettings.slideDuration || 5000;
    slideInterval = setInterval(nextSlide, slideDuration);
    console.log(`Slideshow started with interval: ${slideDuration}ms`);
}

/**
 * Stops the automatic slideshow
 */
function stopSlideShow() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
        console.log('Slideshow stopped.');
    }
} 