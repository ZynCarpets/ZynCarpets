// Test website accessibility and identify potential issues
describe('Accessibility Tests', () => {
    beforeEach(() => {
        loadHtml(); // Load dist/index.html
        // Any specific setup for accessibility tests, if needed, after HTML is loaded.
    });

    afterEach(() => {
        document.body.innerHTML = '';
        if (window.SITE_DATA) delete window.SITE_DATA;
    });

    describe('Heading Structure', () => {
        test('has proper heading hierarchy without skipped levels', () => {
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            const headingLevels = Array.from(headings).map(h => parseInt(h.tagName[1]));
            
            for (let i = 1; i < headingLevels.length; i++) {
                expect(headingLevels[i] - headingLevels[i-1]).toBeLessThanOrEqual(1);
            }
        });
    });

    describe('ARIA Landmarks', () => {
        test('has proper ARIA landmarks', () => {
            const landmarks = document.querySelectorAll(
                'header, nav, main, footer, [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"]'
            );
            expect(landmarks.length).toBeGreaterThan(0);
        });
    });

    describe('Form Accessibility', () => {
        test('all form controls have proper labeling', () => {
            const formInputs = document.querySelectorAll('input, select, textarea');
            formInputs.forEach(input => {
                if (input.tagName === 'INPUT' && input.type === 'hidden') return; // skip hidden inputs
                const id = input.id;
                const label = document.querySelector(`label[for="${id}"]`);
                const ariaLabel = input.getAttribute('aria-label');
                const ariaLabelledby = input.getAttribute('aria-labelledby');
                if (!(label || ariaLabel || ariaLabelledby)) {
                    // Debug output
                    console.error('Input missing label:', input.outerHTML);
                }
                expect(label || ariaLabel || ariaLabelledby).toBeTruthy();
            });
        });

        test('forms have proper error handling', () => {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                const errorMessages = form.querySelectorAll('[aria-invalid="true"]');
                errorMessages.forEach(error => {
                    expect(error.hasAttribute('aria-describedby')).toBeTruthy();
                });
            });
        });
    });

    // TODO: The following Color Contrast test is commented out because the current
    // implementation is insufficient. It only checks for non-transparent colors
    // and does not calculate the actual contrast ratio. The window.getComputedStyle
    // mock is also too basic for accurate style resolution in JSDOM for this purpose.
    // A robust color contrast test would require a more sophisticated approach,
    // potentially integrating with a dedicated accessibility testing library or tool
    // that can accurately parse CSS and compute contrast ratios.
    /*
    describe('Color Contrast', () => {
        test('text elements have sufficient color contrast', () => {
            const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, a, button');
            textElements.forEach(element => {
                const style = window.getComputedStyle(element);
                expect(style.backgroundColor).not.toBe('transparent');
                expect(style.color).not.toBe('transparent');
            });
        });
    });
    */

    describe('Image Accessibility', () => {
        test('all images have proper alt text', () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                expect(
                    img.alt || 
                    img.hasAttribute('role') || 
                    img.hasAttribute('aria-hidden')
                ).toBeTruthy();
            });
        });
    });

    describe('Focus Management', () => {
        test('all interactive elements are properly focusable', () => {
            const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
            focusableElements.forEach(element => {
                if (element.hasAttribute('tabindex')) {
                    expect(element.getAttribute('tabindex')).not.toBe('-1');
                }
            });
        });
    });

    describe('ARIA Roles', () => {
        test('elements have valid ARIA roles', () => {
            const validRoles = [
                // Landmark roles
                'banner', 'navigation', 'main', 'complementary', 'contentinfo', 'region', 'search',
                // Widget roles
                'button', 'link', 'checkbox', 'radio', 'textbox', 'combobox', 'listbox', 'menu', 'menuitem', 'tab', 'tabpanel', 'alert',
                'menuitemcheckbox', 'menuitemradio', 'option', 'progressbar', 'scrollbar', 'slider', 'spinbutton', 'switch', 'textbox', 'treeitem',
                // Document structure roles
                'article', 'columnheader', 'definition', 'directory', 'document', 'feed', 'figure', 'group', 'heading', 'img', 'list', 'listitem', 'math', 'none', 'note', 'presentation', 'row', 'rowgroup', 'rowheader', 'separator', 'table', 'term', 'timer', 'toolbar', 'tooltip', 'tree', 'treegrid',
                // Live region roles
                'alert', 'log', 'marquee', 'status', 'timer',
                // Window roles
                'alertdialog', 'dialog',
                // Other
                'application'
            ];
            const elementsWithRoles = document.querySelectorAll('[role]');
            elementsWithRoles.forEach(element => {
                const role = element.getAttribute('role');
                expect(validRoles).toContain(role);
            });
        });
    });

    describe('Language and Navigation', () => {
        test('document has proper language attribute', () => {
            expect(document.documentElement.hasAttribute('lang')).toBeTruthy();
        });

        test('has skip links for keyboard navigation', () => {
            const skipLinks = document.querySelectorAll('a[href^="#"]');
            expect(skipLinks.length).toBeGreaterThan(0);
        });
    });

    describe('Keyboard Navigation', () => {
        test('all interactive elements are keyboard accessible', () => {
            const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"], [role="link"]');
            interactiveElements.forEach(element => {
                expect(element.hasAttribute('tabindex')).toBeFalsy();
            });
        });
    });

    describe('Focus Indicators', () => {
        test('focusable elements have visible focus indicators', () => {
            const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
            focusableElements.forEach(element => {
                const style = window.getComputedStyle(element);
                expect(style.outline).not.toBe('none');
            });
        });
    });
});

// Export the test suite
// module.exports = {
// testAccessibility: () => {
// // The tests will be run by Jest automatically
//    }
// }; 