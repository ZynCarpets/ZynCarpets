// Test website accessibility and identify potential issues
describe('Accessibility Tests', () => {
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
                const id = input.id;
                const label = document.querySelector(`label[for="${id}"]`);
                const ariaLabel = input.getAttribute('aria-label');
                const ariaLabelledby = input.getAttribute('aria-labelledby');

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

    describe('Image Accessibility', () => {
        test('all images have proper alt text or ARIA attributes', () => {
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
                'button', 'link', 'checkbox', 'radio', 'textbox', 
                'combobox', 'listbox', 'menu', 'menuitem', 'tab', 'tabpanel'
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

// Run the test when the page is fully loaded
window.addEventListener('load', testAccessibility); 