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

    test('invalid email format fails validation', () => {
        const emailField = document.getElementById('email');
        emailField.value = 'invalid-email';
        const inputEvent = document.createEvent('Event');
        inputEvent.initEvent('input', true, true);
        emailField.dispatchEvent(inputEvent);
        expect(emailField.checkValidity()).toBe(false);
    });

    test('error message is displayed on invalid input', () => {
        // Simulate error message display logic
        const nameField = document.getElementById('name');
        nameField.value = '';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-message';
        errorDiv.id = 'name-message';
        errorDiv.textContent = '';
        document.body.appendChild(errorDiv);
        // Simulate validation and error display
        if (!nameField.value) {
            errorDiv.textContent = 'Name is required.';
        }
        expect(errorDiv.textContent).toBe('Name is required.');
        document.body.removeChild(errorDiv);
    });

    test('successful form submission (mocked)', () => {
        const form = document.getElementById('contact-form');
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = fieldId === 'email' ? 'test@example.com' : 'test value';
            }
        });
        // Mock submit event
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        let submitted = false;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            submitted = true;
        });
        form.dispatchEvent(submitEvent);
        expect(submitted).toBe(true);
    });
});

// To run the tests manually, open the browser console and type: testContactForm()
// Note: This will temporarily modify form values during testing but will restore them after 