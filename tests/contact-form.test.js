// Test contact form functionality
describe('Contact Form Tests', () => {
    let form;
    let originalValues = {};
    const requiredFields = ['name', 'email', 'phone', 'street', 'zip'];

    beforeEach(() => {
        form = document.getElementById('contact-form');
        expect(form).toBeTruthy();

        // Store original form values
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                originalValues[fieldId] = field.value;
            }
        });
    });

    afterEach(() => {
        // Reset form values to original state
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = originalValues[fieldId] || '';
                field.dispatchEvent(new Event('input'));
            }
        });
    });

    describe('Form Structure', () => {
        test('all required fields are present', () => {
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                expect(field).toBeTruthy();
                expect(field.hasAttribute('required')).toBeTruthy();
            });
        });
    });

    describe('Form Validation', () => {
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
            test(`validates ${testCase.description} correctly`, () => {
                // Set form values
                Object.keys(testCase).forEach(key => {
                    if (key !== 'expected' && key !== 'description') {
                        const field = document.getElementById(key);
                        if (field) {
                            field.value = testCase[key];
                            field.dispatchEvent(new Event('input'));
                        }
                    }
                });

                expect(form.checkValidity()).toBe(testCase.expected);
            });
        });
    });

    describe('Formspree Integration', () => {
        test('formspree form ID is properly configured', () => {
            const formspreeId = form.getAttribute('data-formspree-id');
            expect(formspreeId).toBeTruthy();
            expect(formspreeId).not.toBe('process.env.FORMSPREE_FORM_ID');
        });
    });

    describe('Form Submission', () => {
        test('form submission handler works correctly', () => {
            let submitCalled = false;
            const originalSubmit = form.submit;

            form.submit = function(e) {
                submitCalled = true;
                return false; // Prevent actual submission
            };

            form.dispatchEvent(new Event('submit'));
            expect(submitCalled).toBeTruthy();

            // Restore original submit
            form.submit = originalSubmit;
        });
    });
});

// To run the tests manually, open the browser console and type: testContactForm()
// Note: This will temporarily modify form values during testing but will restore them after 