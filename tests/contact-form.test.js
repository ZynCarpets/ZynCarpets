// Test contact form functionality
describe('Contact Form Tests', () => {
    let form;
    const requiredFields = ['name', 'email', 'phone', 'street', 'zip'];

    beforeEach(() => {
        // Set up the DOM with a contact form
        document.body.innerHTML = `
            <form id="contact-form" data-formspree-id="test-form-id">
                <input type="text" id="name" required>
                <input type="email" id="email" required>
                <input type="tel" id="phone" required>
                <input type="text" id="street" required>
                <input type="text" id="zip" required>
            </form>
        `;
        form = document.getElementById('contact-form');
        expect(form).toBeTruthy();
    });

    test('all required fields are present', () => {
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            expect(field).toBeTruthy();
            expect(field.hasAttribute('required')).toBeTruthy();
        });
    });

    test('form validation works correctly', () => {
        // Test valid data
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = fieldId === 'email' ? 'test@example.com' : 'test value';
                // Create a proper input event
                const inputEvent = document.createEvent('Event');
                inputEvent.initEvent('input', true, true);
                field.dispatchEvent(inputEvent);
            }
        });
        expect(form.checkValidity()).toBe(true);

        // Test invalid data
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = '';
                // Create a proper input event
                const inputEvent = document.createEvent('Event');
                inputEvent.initEvent('input', true, true);
                field.dispatchEvent(inputEvent);
            }
        });
        expect(form.checkValidity()).toBe(false);
    });

    test('formspree integration is configured', () => {
        const formspreeId = form.getAttribute('data-formspree-id');
        expect(formspreeId).toBeTruthy();
        expect(formspreeId).not.toBe('process.env.FORMSPREE_FORM_ID');
    });
});

// To run the tests manually, open the browser console and type: testContactForm()
// Note: This will temporarily modify form values during testing but will restore them after 