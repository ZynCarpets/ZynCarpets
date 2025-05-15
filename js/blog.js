/**
 * Initializes blog post cards in the blog grid.
 * Fetches blog post data from window.SITE_DATA.blogPosts.
 */
function initializeBlogPosts() {
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) {
        console.warn('Blog grid (#blog-grid) not found. Skipping blog posts initialization.');
        return;
    }

    if (!window.SITE_DATA || !window.SITE_DATA.blogPosts || window.SITE_DATA.blogPosts.length === 0) {
        console.warn('SITE_DATA.blogPosts not found or empty. Skipping blog posts initialization.');
        blogGrid.innerHTML = '<p>No blog posts available at the moment.</p>'; // User-friendly message
        return;
    }
    const blogPosts = window.SITE_DATA.blogPosts;

    // Clear existing content
    blogGrid.innerHTML = '';

    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-card';
        
        // Basic sanitization for text content (more robust sanitization might be needed if HTML is allowed in data)
        const title = post.title || 'Untitled Post';
        const date = post.date || '';
        const excerpt = post.excerpt || '';
        const image = post.image || 'path/to/default-image.jpg'; // Fallback image
        const altText = post.alt || title; // Use title as alt text if specific alt is not provided
        const link = post.link || '#';

        postElement.innerHTML = `
            <img src="${image}" alt="${altText}" loading="lazy">
            <div class="content">
                <h3>${title}</h3>
                <p class="date">${date}</p>
                <p>${excerpt}</p>
                <a href="${link}" class="read-more">Read More</a>
            </div>
        `;
        
        blogGrid.appendChild(postElement);
    });
} 