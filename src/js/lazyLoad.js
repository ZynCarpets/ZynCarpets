/**
 * Initializes lazy loading for images.
 * Checks for native 'loading="lazy"' support and falls back to IntersectionObserver if not supported.
 * The IntersectionObserver specifically looks for images with a 'data-src' attribute.
 */
function initializeLazyLoading() {
    // Check if browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        console.log('Native lazy loading supported by the browser.');
        // Optional: You could still iterate over images explicitly set with data-src 
        // to ensure they are also switched to src if native lazy loading didn't pick them up for some reason,
        // or if you want to remove data-src. But generally, native support should handle it.
        // For now, relying on native `loading="lazy"` if supported.
        return;
    }

    console.log('Native lazy loading not supported. Using IntersectionObserver fallback for images with data-src.');
    
    // Create intersection observer for fallback lazy loading
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Check if the image has a data-src attribute
                if (img.dataset.src) {
                    console.log('Lazy loading image:', img.dataset.src);
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src'); // Clean up the attribute
                    
                    // Optional: Add a class to indicate the image has been loaded
                    img.classList.add('lazy-loaded');

                    observer.unobserve(img); // Stop observing this image once loaded
                }
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px', // Start loading images 200px before they enter the viewport
        threshold: 0.01 // Trigger when even 1% of the image is visible
    });

    // Observe all images with data-src attribute
    // This is crucial for the fallback to work. Images intended for JS-based lazy load
    // should have 'data-src' instead of 'src'.
    document.querySelectorAll('img[data-src]').forEach(img => {
        lazyLoadObserver.observe(img);
    });
} 