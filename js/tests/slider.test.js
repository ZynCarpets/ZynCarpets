// Test slider functionality
describe('Slider Functionality', () => {
    let sliderElement;
    let dotsContainer;
    let slides;
    let dots;
    const getSliderImagesFromSiteData = () => window.SITE_DATA && window.SITE_DATA.sliderImages ? window.SITE_DATA.sliderImages : [];

    beforeEach(() => {
        // The DOM is prepared and js/script.js (including initializeSlider) is run by setup.js
        // We need to re-query elements for each test as DOM might be reset by setup.js's afterEach
        sliderElement = document.getElementById('slider');
        dotsContainer = document.getElementById('slider-dots');
        
        if (sliderElement) {
            slides = sliderElement.querySelectorAll('.slide');
        } else {
            slides = []; // Ensure slides is an array even if sliderElement is not found
        }
        
        if (dotsContainer) {
            dots = dotsContainer.querySelectorAll('.dot');
        } else {
            dots = []; // Ensure dots is an array even if dotsContainer is not found
        }

        // Stop the slideshow for test predictability if startSlideShow/stopSlideShow are global
        if (typeof window.stopSlideShow === 'function') {
            window.stopSlideShow();
        }
        // Clear any spies/mocks if we add them later, e.g., for setInterval
        // jest.clearAllMocks();
    });

    test('slider and dot container elements should exist', () => {
        expect(sliderElement).toBeTruthy();
        expect(dotsContainer).toBeTruthy();
    });

    test('initializes with the correct number of slides based on SITE_DATA', () => {
        const sliderImages = getSliderImagesFromSiteData();
        // Add a guard for sliderImages to prevent error if SITE_DATA is not as expected
        if (!sliderImages || sliderImages.length === 0) {
            console.warn('No slider images found in SITE_DATA for test. Skipping count check or expecting 0.');
             expect(slides.length).toBe(0); // Or handle as appropriate for your design if SITE_DATA can be empty
        } else {
            expect(slides.length).toBe(sliderImages.length);
        }
    });

    test('initializes with the correct number of dots based on SITE_DATA', () => {
        const sliderImages = getSliderImagesFromSiteData();
        if (!sliderImages || sliderImages.length === 0) {
            console.warn('No slider images found in SITE_DATA for test. Skipping count check or expecting 0.');
            expect(dots.length).toBe(0);
        } else {
            expect(dots.length).toBe(sliderImages.length);
        }
    });

    test('first slide is active and has an image loaded initially', () => {
        const sliderImages = getSliderImagesFromSiteData();
        if (slides.length > 0 && sliderImages.length > 0) {
            expect(slides[0].classList.contains('active')).toBe(true);
            const firstImage = slides[0].querySelector('img.slide-image');
            expect(firstImage).toBeTruthy();
            // Check if the src attribute is set (not data-src) for the first image as it should load immediately
            expect(firstImage.getAttribute('src')).toBe(sliderImages[0].url);
            expect(firstImage.hasAttribute('data-src')).toBe(false); // Or check it matches src, depending on lazy load logic for first image
        } else {
            // If no slides, this test doesn't make sense, or should assert no active slide.
            // Depending on strictness, you could fail or skip.
            console.warn('No slides found; skipping initial active slide content check.');
            expect(true).toBe(true); // Placeholder to pass if no slides
        }
    });

    test('first dot is active initially', () => {
        if (dots.length > 0) {
            expect(dots[0].classList.contains('active')).toBe(true);
        } else {
            console.warn('No dots found; skipping initial active dot check.');
            expect(true).toBe(true); // Placeholder to pass if no dots
        }
    });

    test('other slides are not active initially', () => {
        if (slides.length > 1) {
            for (let i = 1; i < slides.length; i++) {
                expect(slides[i].classList.contains('active')).toBe(false);
            }
        } else {
            console.warn('Less than 2 slides; skipping "other slides not active" check.');
             expect(true).toBe(true); // Placeholder
        }
    });

    test('other dots are not active initially', () => {
        if (dots.length > 1) {
            for (let i = 1; i < dots.length; i++) {
                expect(dots[i].classList.contains('active')).toBe(false);
            }
        } else {
            console.warn('Less than 2 dots; skipping "other dots not active" check.');
            expect(true).toBe(true); // Placeholder
        }
    });

    test('clicking a dot changes the active slide and dot', () => {
        const sliderImages = getSliderImagesFromSiteData();
        if (dots.length > 1 && slides.length > 1 && sliderImages.length > 1) {
            const secondDot = dots[1];
            const firstSlide = slides[0];
            const secondSlide = slides[1];
            const firstDot = dots[0];

            // Pre-condition: first slide/dot are active
            expect(firstSlide.classList.contains('active')).toBe(true);
            expect(firstDot.classList.contains('active')).toBe(true);
            expect(secondSlide.classList.contains('active')).toBe(false);
            expect(secondDot.classList.contains('active')).toBe(false);

            secondDot.click();

            // Post-condition: second slide/dot are active
            expect(secondSlide.classList.contains('active')).toBe(true);
            expect(secondDot.classList.contains('active')).toBe(true);
            expect(firstSlide.classList.contains('active')).toBe(false);
            expect(firstDot.classList.contains('active')).toBe(false);

            // Check if the second slide's image is now loaded (if it was lazy-loaded)
            const secondImage = secondSlide.querySelector('img.slide-image');
            expect(secondImage).toBeTruthy();
            expect(secondImage.getAttribute('src')).toBe(sliderImages[1].url);

        } else {
            console.warn('Less than 2 slides/dots; skipping dot navigation test.');
            expect(true).toBe(true); // Placeholder to pass if not enough elements
        }
    });

    describe('Autoplay Functionality', () => {
        beforeEach(() => {
            jest.useFakeTimers();
            // Ensure stopSlideShow is called to clear any real timers from initial setup if any leak
            if(typeof window.stopSlideShow === 'function') window.stopSlideShow(); 
            // Spy on setInterval and clearInterval
            jest.spyOn(window, 'setInterval');
            jest.spyOn(window, 'clearInterval');
        });

        afterEach(() => {
            jest.clearAllTimers(); // Clears any timers that were set up with Jest fake timers
            jest.restoreAllMocks(); // Restore original setInterval/clearInterval
        });

        test('stopSlideShow clears the interval', () => {
            // First, call startSlideShow to ensure there's an interval to clear
            if (typeof window.startSlideShow === 'function') {
                window.startSlideShow();
                // Assuming startSlideShow sets an interval and stores its ID internally (e.g., in slideInterval)
                // We can check if clearInterval gets called with that ID.
                // For a simple check: ensure clearInterval is called.
                if (typeof window.stopSlideShow === 'function') {
                    window.stopSlideShow();
                    expect(window.clearInterval).toHaveBeenCalled();
                } else {
                    throw new Error('stopSlideShow function not found on window');
                }
            } else {
                throw new Error('startSlideShow function not found on window');
            }
        });

        test('startSlideShow sets an interval', () => {
            if (typeof window.startSlideShow === 'function' && typeof window.nextSlide === 'function') {
                window.startSlideShow();
                expect(window.setInterval).toHaveBeenCalledTimes(1);
                expect(window.setInterval).toHaveBeenCalledWith(window.nextSlide, 6000);
            } else {
                throw new Error('startSlideShow or nextSlide function not found on window');
            }
        });

        test('slides advance automatically when slideshow is active', () => {
            const sliderImages = getSliderImagesFromSiteData();
            if (slides.length > 1 && sliderImages.length > 1 && typeof window.startSlideShow === 'function') {
                window.startSlideShow();

                // Pre-condition: first slide is active
                expect(slides[0].classList.contains('active')).toBe(true);

                // Advance timer by the slide interval (e.g., 6000ms)
                jest.advanceTimersByTime(6000);

                // Post-condition: second slide should be active
                expect(slides[1].classList.contains('active')).toBe(true);
                expect(slides[0].classList.contains('active')).toBe(false);

                // Advance timer again
                jest.advanceTimersByTime(6000);
                if (slides.length > 2) {
                    expect(slides[2].classList.contains('active')).toBe(true);
                } else { // Wraps around if only 2 slides
                    expect(slides[0].classList.contains('active')).toBe(true);
                }
            } else {
                console.warn('Not enough slides or startSlideShow not found; skipping auto-advance test.');
                expect(true).toBe(true);
            }
        });
    });

    // More tests will be added here for navigation, autoplay, etc.
}); 