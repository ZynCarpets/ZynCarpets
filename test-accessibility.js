// Test website accessibility and identify potential issues
function testAccessibility() {
    const results = {
        passed: [],
        failed: [],
        warnings: []
    };

    // Test for proper heading structure
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingLevels = Array.from(headings).map(h => parseInt(h.tagName[1]));
    
    // Check for skipped heading levels
    for (let i = 1; i < headingLevels.length; i++) {
        if (headingLevels[i] - headingLevels[i-1] > 1) {
            results.failed.push(`Skipped heading level from h${headingLevels[i-1]} to h${headingLevels[i]}`);
        }
    }

    // Test for proper ARIA landmarks
    const landmarks = document.querySelectorAll('header, nav, main, footer, [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"]');
    if (landmarks.length === 0) {
        results.warnings.push('No ARIA landmarks found');
    } else {
        results.passed.push('ARIA landmarks are present');
    }

    // Test for proper form labels
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        const id = input.id;
        const label = document.querySelector(`label[for="${id}"]`);
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledby = input.getAttribute('aria-labelledby');

        if (!label && !ariaLabel && !ariaLabelledby) {
            results.failed.push(`Form control ${id || 'unnamed'} lacks proper labeling`);
        } else {
            results.passed.push(`Form control ${id || 'unnamed'} has proper labeling`);
        }
    });

    // Test for proper color contrast
    const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, a, button');
    textElements.forEach(element => {
        const style = window.getComputedStyle(element);
        const backgroundColor = style.backgroundColor;
        const color = style.color;
        
        if (backgroundColor === 'transparent' || color === 'transparent') {
            results.warnings.push(`Element ${element.id || 'unnamed'} might have insufficient color contrast`);
        }
    });

    // Test for proper alt text on images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.alt && !img.hasAttribute('role') && !img.hasAttribute('aria-hidden')) {
            results.failed.push(`Image ${img.src} missing alt text`);
        } else if (img.alt) {
            results.passed.push(`Image ${img.src} has alt text`);
        }
    });

    // Test for proper focus management
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
    focusableElements.forEach(element => {
        if (element.hasAttribute('tabindex') && element.getAttribute('tabindex') === '-1') {
            results.warnings.push(`Element ${element.id || 'unnamed'} is not focusable`);
        }
    });

    // Test for proper ARIA roles
    const elementsWithRoles = document.querySelectorAll('[role]');
    elementsWithRoles.forEach(element => {
        const role = element.getAttribute('role');
        if (!['button', 'link', 'checkbox', 'radio', 'textbox', 'combobox', 'listbox', 'menu', 'menuitem', 'tab', 'tabpanel'].includes(role)) {
            results.warnings.push(`Element ${element.id || 'unnamed'} has non-standard ARIA role: ${role}`);
        }
    });

    // Test for proper language attributes
    if (!document.documentElement.hasAttribute('lang')) {
        results.failed.push('Document language not specified');
    } else {
        results.passed.push('Document language is specified');
    }

    // Test for proper skip links
    const skipLinks = document.querySelectorAll('a[href^="#"]');
    if (skipLinks.length === 0) {
        results.warnings.push('No skip links found for keyboard navigation');
    }

    // Test for proper form error handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const errorMessages = form.querySelectorAll('[aria-invalid="true"]');
        if (errorMessages.length > 0) {
            results.warnings.push(`Form ${form.id || 'unnamed'} has invalid fields without proper error handling`);
        }
    });

    // Log results
    console.log('=== Accessibility Test Results ===');
    console.log('\nPassed:');
    results.passed.forEach(result => console.log('✅ ' + result));
    console.log('\nFailed:');
    results.failed.forEach(result => console.log('❌ ' + result));
    console.log('\nWarnings:');
    results.warnings.forEach(warning => console.log('⚠️ ' + warning));

    // Additional accessibility recommendations
    console.log('\n=== Additional Accessibility Recommendations ===');
    console.log('1. Ensure all interactive elements are keyboard accessible');
    console.log('2. Provide text alternatives for non-text content');
    console.log('3. Make sure content is readable and understandable');
    console.log('4. Ensure content is robust and compatible with assistive technologies');
    console.log('5. Test with screen readers (NVDA, VoiceOver, JAWS)');
    console.log('6. Test with keyboard-only navigation');
    console.log('7. Test with different zoom levels (up to 200%)');
    console.log('8. Consider implementing skip links for main content');
    console.log('9. Ensure sufficient color contrast (WCAG 2.1 Level AA)');
    console.log('10. Provide clear focus indicators');

    return results;
}

// Run the test when the page is fully loaded
window.addEventListener('load', testAccessibility); 