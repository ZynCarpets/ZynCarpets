// Initialize social media links
function initializeSocialLinks() {
    console.log('[socialLinks] Initializing social media links...');
    
    if (!window.SITE_DATA || !window.SITE_DATA.socialMediaLinks) {
        console.error('[socialLinks] SITE_DATA or socialMediaLinks not available');
        return;
    }
    
    const socialLinks = window.SITE_DATA.socialMediaLinks;
    
    // Update Facebook link
    const facebookLink = document.querySelector('a[href="#facebook"]');
    if (facebookLink && socialLinks.facebook) {
        facebookLink.href = socialLinks.facebook;
        console.log('[socialLinks] Facebook link updated');
    }
    
    // Update Instagram link
    const instagramLink = document.querySelector('a[href="#instagram"]');
    if (instagramLink && socialLinks.instagram) {
        instagramLink.href = socialLinks.instagram;
        console.log('[socialLinks] Instagram link updated');
    }
    
    // Update Twitter link
    const twitterLink = document.querySelector('a[href="#twitter"]');
    if (twitterLink && socialLinks.twitter) {
        twitterLink.href = socialLinks.twitter;
        console.log('[socialLinks] Twitter link updated');
    }
    
    console.log('[socialLinks] Social media links initialization complete');
}

// Make the function available globally
window.initializeSocialLinks = initializeSocialLinks; 