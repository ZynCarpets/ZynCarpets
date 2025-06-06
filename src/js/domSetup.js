/**
 * Helper function to safely set text content of an element.
 * @param {string} elementId - The ID of the DOM element.
 * @param {string} text - The text to set.
 * @returns {boolean} True if successful, false otherwise.
 */
function safeSetText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
        return true;
    }
    console.warn(`[domSetup] Element with id '${elementId}' not found for setting text.`);
    return false;
}

/**
 * Sets up static DOM content based on SITE_DATA.
 * This includes company information, taglines, descriptions, footer details, and coverage areas.
 */
function initializeDomContent() {
    console.log('[domSetup] Setting company information in DOM elements...');

    if (!window.SITE_DATA || !window.SITE_DATA.companyInfo) {
        console.error('[domSetup] window.SITE_DATA or window.SITE_DATA.companyInfo is not available. Cannot set DOM content.');
        return;
    }
    const { companyInfo } = window.SITE_DATA;

    // Set text content for various elements
    const elementsToUpdate = {
        'tagline': companyInfo.tagline,
        'welcome-tagline': companyInfo.welcomeTagline,
        'description': companyInfo.description,
        'footer-company-name': companyInfo.footerCompanyName,
        'footer-description': companyInfo.footerDescription,
        'footer-copyright-name': companyInfo.footerCompanyName
    };

    Object.entries(elementsToUpdate).forEach(([id, text]) => {
        if (text !== undefined) { // Only attempt to set if text is provided
            safeSetText(id, text);
        } else {
            console.warn(`[domSetup] No text provided for element ID '${id}' in SITE_DATA.companyInfo.`);
        }
    });
    
    // Set contact information
    if (companyInfo.footerPhone !== undefined) {
        safeSetText('footer-phone', companyInfo.footerPhone);
    } else {
        console.warn(`[domSetup] No footerPhone provided in SITE_DATA.companyInfo.`);
    }
    if (companyInfo.footerEmail !== undefined) {
        safeSetText('footer-email', companyInfo.footerEmail);
    } else {
        console.warn(`[domSetup] No footerEmail provided in SITE_DATA.companyInfo.`);
    }
    
    // Set coverage area information
    const coverageSubtitle = document.getElementById('coverage-subtitle');
    if (coverageSubtitle) {
        if (companyInfo.coverageAreas && companyInfo.coverageStates && 
            companyInfo.coverageAreas.length > 0 && companyInfo.coverageStates.length > 0) {
            const areas = companyInfo.coverageAreas.join(', ');
            const states = companyInfo.coverageStates.join(', ');
            coverageSubtitle.textContent = `Currently serving ${areas}, ${states}`;
            console.log('[domSetup] Coverage area information set:', { areas, states });
        } else {
            console.warn('[domSetup] Coverage area data (coverageAreas or coverageStates) missing or empty in SITE_DATA.companyInfo. Coverage subtitle not set.');
            coverageSubtitle.textContent = 'Coverage information currently unavailable.'; // Fallback text
        }
    } else {
        console.warn('[domSetup] Coverage subtitle element (#coverage-subtitle) not found.');
    }

    // Set footer coverage areas
    const footerAddress = document.getElementById('footer-address');
    if (footerAddress) {
        if (companyInfo.coverageAreas && companyInfo.coverageStates && 
            companyInfo.coverageAreas.length > 0 && companyInfo.coverageStates.length > 0) {
            const areas = companyInfo.coverageAreas.join(', ');
            const states = companyInfo.coverageStates.join(', ');
            footerAddress.textContent = `Address: Serving ${areas}, ${states}`;
            console.log('[domSetup] Footer coverage area information set:', { areas, states });
        } else {
            console.warn('[domSetup] Coverage area data missing for footer. Using fallback text.');
            footerAddress.textContent = 'Address: Coverage information currently unavailable.';
        }
    } else {
        console.warn('[domSetup] Footer address element not found.');
    }

    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    console.log('[domSetup] DOM content setup complete.');
} 