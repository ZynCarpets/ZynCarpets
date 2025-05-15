console.log('[slider.js] Script start');

window.sliderScriptLoaded = true;

window.initializeSlider = function() {
    console.log('[slider.js] window.initializeSlider was called');
    // Try to create a dummy element to see if basic DOM manipulation works from here
    const sliderDiv = document.getElementById('slider');
    if (sliderDiv) {
        const testElem = document.createElement('div');
        testElem.id = 'sliderTestElement';
        testElem.textContent = 'Slider script was here';
        sliderDiv.appendChild(testElem);
        console.log('[slider.js] Dummy element appended to slider.');
    } else {
        console.log('[slider.js] Could not find #slider to append dummy element.');
    }
};

console.log('[slider.js] window.initializeSlider defined:', typeof window.initializeSlider);
console.log('[slider.js] Script end');

// All other functions (goToSlide, nextSlide, etc.) are removed for this test. 