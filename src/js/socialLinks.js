/**
 * Initializes social media links in the designated container.
 * Fetches link data from window.SITE_DATA.socialMediaLinks.
 */
function initializeSocialLinks() {
    const { socialMediaLinks } = window.SITE_DATA;
    const socialLinksContainer = document.getElementById('social-links');

    if (!socialLinksContainer) {
        console.warn('Social links container (#social-links) not found. Skipping social links initialization.');
        return;
    }

    // Ensure SITE_DATA and socialMediaLinks are available
    if (!window.SITE_DATA || !window.SITE_DATA.socialMediaLinks) {
        console.warn('SITE_DATA or SITE_DATA.socialMediaLinks not found. Skipping social links initialization.');
        return;
    }

    const socialIcons = {
        facebook: 'fa-facebook-f',
        instagram: 'fa-instagram',
        twitter: 'fa-twitter',
        linkedin: 'fa-linkedin-in', // Added example
        youtube: 'fa-youtube'    // Added example
        // Add other platforms and their Font Awesome icons here
    };

    // Clear any existing links to prevent duplication if re-initialized
    socialLinksContainer.innerHTML = '';

    Object.entries(socialMediaLinks).forEach(([platform, url]) => {
        if (url && socialIcons[platform.toLowerCase()]) { // Ensure URL exists and platform is supported
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('aria-label', `Visit our ${platform} page`); // Accessibility
            link.innerHTML = `<i class="fab ${socialIcons[platform.toLowerCase()]}"></i>`;
            socialLinksContainer.appendChild(link);
        } else if (url) {
            console.warn(`Social media platform "${platform}" is not configured with an icon.`);
        }
    });
} 