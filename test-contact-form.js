// Test contact form functionality
function testContactForm() {
    const results = {
        passed: [],
        failed: [],
        skipped: []
    };

    // Test form elements
    const form = document.getElementById('contact-form');
    const requiredFields = ['name', 'email', 'phone', 'street', 'zip'];
    
    if (!form) {
        results.failed.push('Contact form not found in the DOM');
        return results;
    }

    // Test required fields
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field) {
            results.failed.push(`Required field ${fieldId} not found`);
        } else {
            results.passed.push(`Field ${fieldId} found`);
            
            // Test required attribute
            if (field.hasAttribute('required')) {
                results.passed.push(`Field ${fieldId} has required attribute`);
            } else {
                results.failed.push(`Field ${fieldId} missing required attribute`);
            }
        }
    });

    // Test form validation
    const testCases = [
        {
            name: 'John Doe',
            email: 'test@example.com',
            phone: '1234567890',
            street: '123 Main St',
            zip: '12345',
            expected: true,
            description: 'Valid data'
        },
        {
            name: '',
            email: 'invalid-email',
            phone: '123',
            street: '',
            zip: '123',
            expected: false,
            description: 'Invalid data'
        }
    ];

    testCases.forEach(testCase => {
        // Set form values
        Object.keys(testCase).forEach(key => {
            if (key !== 'expected' && key !== 'description') {
                const field = document.getElementById(key);
                if (field) {
                    field.value = testCase[key];
                    // Trigger input event to activate validation
                    field.dispatchEvent(new Event('input'));
                }
            }
        });

        // Test form validation
        const isValid = form.checkValidity();
        if (isValid === testCase.expected) {
            results.passed.push(`Form validation ${testCase.description}: ${isValid ? 'passed' : 'failed'} as expected`);
        } else {
            results.failed.push(`Form validation ${testCase.description}: expected ${testCase.expected} but got ${isValid}`);
        }
    });

    // Test Formspree integration
    const formspreeId = form.getAttribute('data-formspree-id');
    if (formspreeId && formspreeId !== 'process.env.FORMSPREE_FORM_ID') {
        results.passed.push('Formspree form ID is configured');
    } else {
        results.failed.push('Formspree form ID is not properly configured');
    }

    // Test form submission
    const originalSubmit = form.submit;
    let submitCalled = false;
    
    form.submit = function(e) {
        submitCalled = true;
        results.passed.push('Form submission handler is working');
        return false; // Prevent actual submission
    };

    // Trigger form submission
    form.dispatchEvent(new Event('submit'));
    
    if (!submitCalled) {
        results.failed.push('Form submission handler not called');
    }

    // Restore original submit
    form.submit = originalSubmit;

    // Log results
    console.log('=== Contact Form Test Results ===');
    console.log('\nPassed:');
    results.passed.forEach(result => console.log('✅ ' + result));
    console.log('\nFailed:');
    results.failed.forEach(result => console.log('❌ ' + result));
    console.log('\nSkipped:');
    results.skipped.forEach(result => console.log('⚠️ ' + result));

    return results;
}

// Run the test when the page is fully loaded
window.addEventListener('load', testContactForm); 