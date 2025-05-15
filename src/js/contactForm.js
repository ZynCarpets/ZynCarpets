// Contact Form Logic

/**
 * Initializes zip code validation in contact form
 */
function initializeContactZipValidation() {
    const zipInput = document.getElementById('zip');
    const validationMessage = document.getElementById('zip-message');

    if (!zipInput || !validationMessage || !window.contactForm) {
        console.error('Required elements not found for zip code validation, or contactForm is missing globally');
        return;
    }

    validationMessage.style.display = 'none';

    zipInput.addEventListener('input', (e) => {
        validationMessage.style.display = 'block';
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        
        if (!e.target.value) {
            showValidationError('Please enter your zip code');
        } else if (e.target.value.length === 5) {
            validateContactZip(e.target.value);
        }
    });

    window.contactForm.addEventListener('submit', (e) => {
        validationMessage.style.display = 'block';
        const zipCode = zipInput.value.trim();
        
        if (!zipCode || zipCode.length !== 5) {
            e.preventDefault();
            showValidationError('Please enter a valid 5-digit zip code');
            zipInput.focus();
            return;
        }

        if (!checkZipCodeCoverage(zipCode)) {
            e.preventDefault();
            showValidationError('Sorry, we don\'t currently service this area');
            zipInput.focus();
        }
    });
}

function showValidationError(message) {
    const validationMessage = document.getElementById('zip-message');
    if (validationMessage) {
        validationMessage.textContent = message;
        validationMessage.className = 'validation-message';
        validationMessage.style.display = 'block';
    }
}

function validateContactZip(zipCode) {
    if (!/^\d{5}$/.test(zipCode)) {
        showValidationError('Please enter a valid 5-digit zip code');
        return false;
    }

    if (checkZipCodeCoverage(zipCode)) {
        const validationMessage = document.getElementById('zip-message');
        if (validationMessage) {
            validationMessage.textContent = 'Great! We service your area';
            validationMessage.className = 'validation-message success';
            validationMessage.style.display = 'block';
        }
        return true;
    } else {
        showValidationError('Sorry, we don\'t currently service this area');
        return false;
    }
}

function checkZipCodeCoverage(zipCode) {
    zipCode = zipCode.replace(/[^0-9]/g, '');
    if (zipCode.length !== 5) {
        return false;
    }
    const serviceAreas = {
        '35756': true, '35757': true, '35758': true,
        '35801': true, '35802': true, '35803': true, '35804': true, '35805': true, '35806': true, '35807': true, '35808': true, '35809': true, '35810': true, '35811': true, '35812': true, '35813': true, '35814': true, '35815': true, '35816': true, '35824': true,
        '35611': true, '35613': true, '35614': true
    };
    return serviceAreas.hasOwnProperty(zipCode) && serviceAreas[zipCode] === true;
}

function validateName(name) {
    if (!name.trim()) {
        return 'Name is required';
    }
    if (name.length < 2) {
        return 'Name must be at least 2 characters long';
    }
    return '';
}

function validateEmail(email) {
    if (!email.trim()) {
        return 'Email is required';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validatePhone(phone) {
    if (!phone.trim()) {
        return 'Phone number is required';
    }
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(phone)) {
        return 'Please enter a valid phone number';
    }
    return '';
}

function validateStreet(street) {
    if (!street.trim()) {
        return 'Street address is required';
    }
    if (street.length < 5) {
        return 'Please enter a valid street address';
    }
    return '';
}

function validateZip(zip) {
    if (!zip.trim()) {
        return 'Zip code is required';
    }
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(zip)) {
        return 'Please enter a valid 5-digit zip code';
    }
    const serviceAreas = {
        '35756': true, '35757': true, '35758': true,
        '35801': true, '35802': true, '35803': true, '35804': true, '35805': true, '35806': true, '35807': true, '35808': true, '35809': true, '35810': true, '35811': true, '35812': true, '35813': true, '35814': true, '35815': true, '35816': true, '35824': true,
        '35611': true, '35613': true, '35614': true
    };
    if (!serviceAreas[zip]) {
        return 'Sorry, we don\'t currently service this area.';
    }
    return '';
}

function showValidationMessage(elementId, message, isSuccess = false) {
    console.log(`Showing validation message for ${elementId}:`, { message, isSuccess });
    const element = document.getElementById(elementId);
    const messageElement = document.getElementById(`${elementId}-message`);
    if (!element || !messageElement) {
        console.error(`Validation message elements not found for ${elementId}`);
        return;
    }
    element.classList.remove('valid', 'invalid');
    element.classList.add(isSuccess ? 'valid' : 'invalid');
    messageElement.textContent = message;
    messageElement.className = `validation-message ${isSuccess ? 'success' : 'error'}`;
    messageElement.style.display = 'block';
    console.log(`Validation message displayed for ${elementId}`);
}

function hideValidationMessage(elementId) {
    console.log(`Hiding validation message for ${elementId}`);
    const element = document.getElementById(elementId);
    const messageElement = document.getElementById(`${elementId}-message`);
    if (!element || !messageElement) {
        console.error(`Validation message elements not found for ${elementId}`);
        return;
    }
    element.classList.remove('valid', 'invalid');
    messageElement.style.display = 'none';
    messageElement.textContent = '';
    console.log(`Validation message hidden for ${elementId}`);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="success-icon"></div>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, 3000);
}

function showFormValidation(message, isSuccess = false) {
    console.log('Showing form validation message:', { message, isSuccess });
    const formMessage = document.getElementById('form-validation');
    if (!formMessage) {
        console.error('Form message element not found');
        return;
    }
    if (isSuccess) {
        formMessage.innerHTML = `
            <div class="success-message">
                <div class="success-icon"></div>
                <span>${message}</span>
            </div>
        `;
        const form = document.getElementById('contact-form');
        form.classList.add('form-success');
        showToast(message);
        setTimeout(() => {
            form.classList.remove('form-success');
        }, 1000);
    } else {
        formMessage.textContent = message;
        formMessage.className = 'validation-message error';
    }
    formMessage.style.display = 'block';
    console.log('Form validation message displayed');
}

function generateCSRFToken() {
    const array = new Uint32Array(8);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

function validateCSRFToken(token) {
    const storedTokenInput = document.querySelector('input[name="_csrf"]');
    if (storedTokenInput) {
      return token === storedTokenInput.value;
    }
    console.warn('CSRF token input field not found for validation.');
    return false; // Or handle as a more severe error
}

function initializeContactForm() {
    console.log('Initializing contact form...');
    if (!window.contactForm) {
        console.error('initializeContactForm: window.contactForm not found or not a valid element. Form cannot be initialized.');
        return;
    }
    const form = window.contactForm;
    const submitButton = form.querySelector('button[type="submit"]');

    const csrfTokenInput = form.querySelector('input[name="_csrf"]');
    if (csrfTokenInput) {
        csrfTokenInput.value = generateCSRFToken();
    } else {
        console.warn('CSRF token input field not found in the contact form.');
    }
    

    const inputs = form.querySelectorAll('input[id]'); // Ensure inputs have IDs for validation messages
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const value = this.value.trim();
            let errorMessage = '';
            switch(this.id) {
                case 'name': errorMessage = validateName(value); break;
                case 'email': errorMessage = validateEmail(value); break;
                case 'phone': errorMessage = validatePhone(value); break;
                case 'street': errorMessage = validateStreet(value); break;
                case 'zip': errorMessage = validateZip(value); break;
            }
            if (errorMessage) {
                showValidationMessage(this.id, errorMessage, false);
            } else {
                hideValidationMessage(this.id);
            }
        });
        input.addEventListener('focus', function() {
            hideValidationMessage(this.id); // Hide message specific to this input
        });
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        submitButton.classList.add('loading');
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            street: document.getElementById('street').value,
            zip: document.getElementById('zip').value
        };

        let hasError = false;
        const validations = {
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            phone: validatePhone(formData.phone),
            street: validateStreet(formData.street),
            zip: validateZip(formData.zip)
        };

        Object.entries(validations).forEach(([field, error]) => {
            if (error) {
                showValidationMessage(field, error, false);
                hasError = true;
            } else {
                // Ensure previous error messages are cleared if now valid
                const messageElement = document.getElementById(`${field}-message`);
                if (messageElement && messageElement.style.display !== 'none' && !messageElement.classList.contains('success')) {
                   hideValidationMessage(field);
                }
            }
        });

        if (hasError) {
            submitButton.classList.remove('loading');
            return;
        }

        try {
            const currentCsrfTokenValue = csrfTokenInput ? csrfTokenInput.value : '';
            if (!csrfTokenInput || !validateCSRFToken(currentCsrfTokenValue)) {
                throw new Error('Invalid CSRF token');
            }

            const formAction = form.getAttribute('action');
            const response = await fetch(formAction, {
                method: 'POST',
                body: JSON.stringify({ ...formData, _csrf: currentCsrfTokenValue }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                showFormValidation('Thank you for your submission! We will contact you soon.', true);
                form.reset();
                
                if (csrfTokenInput) { // Regenerate CSRF token
                    csrfTokenInput.value = generateCSRFToken();
                }

                const fields = form.querySelectorAll('input');
                fields.forEach(field => {
                    field.classList.remove('invalid'); // Remove error states
                    field.classList.add('field-success'); // Add success state
                    // Clear individual validation messages
                    const messageElement = document.getElementById(`${field.id}-message`);
                    if (messageElement) {
                        messageElement.style.display = 'none';
                        messageElement.textContent = '';
                    }
                    setTimeout(() => {
                        field.classList.remove('field-success');
                    }, 1000);
                });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showFormValidation('There was an error submitting your form. Please try again.', false);
        } finally {
            submitButton.classList.remove('loading');
        }
    });
} 