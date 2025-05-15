/**
 * Formats a phone number string into (XXX) XXX-XXXX format.
 * @param {string} value - The raw phone number string.
 * @returns {string} The formatted phone number.
 */
function formatPhoneNumberString(value) {
    // Remove all non-numeric characters
    let numericValue = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    numericValue = numericValue.substring(0, 10);
    
    // Format the number as (XXX) XXX-XXXX
    let formattedValue = '';
    if (numericValue.length > 0) {
        if (numericValue.length <= 3) {
            formattedValue = `(${numericValue}`;
        } else if (numericValue.length <= 6) {
            formattedValue = `(${numericValue.substring(0, 3)}) ${numericValue.substring(3)}`;
        } else {
            formattedValue = `(${numericValue.substring(0, 3)}) ${numericValue.substring(3, 6)}-${numericValue.substring(6)}`;
        }
    }
    return formattedValue;
}

/**
 * Initializes phone number formatting for a given input field.
 * Attaches event listeners to format the phone number as the user types.
 * @param {string} inputId - The ID of the phone input element. Defaults to 'phone'.
 */
function initializePhoneFormatting(inputId = 'phone') {
    const phoneInput = document.getElementById(inputId);
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Store cursor position
            let cursorPos = e.target.selectionStart;
            const oldValue = e.target.value;
            
            e.target.value = formatPhoneNumberString(e.target.value);

            // Restore cursor position intelligently
            const newValue = e.target.value;
            if (cursorPos !== null && oldValue.length < newValue.length) {
                // If a formatting character was added, adjust cursor
                const diff = newValue.length - oldValue.length;
                // Check if the character at new cursor position is what we added
                // This logic can be complex; a simpler approach is often fine.
                if (/\D/.test(newValue.charAt(cursorPos))) {
                     cursorPos += diff;
                }
            } else if (cursorPos !== null && oldValue.length > newValue.length) {
                // If characters were removed (e.g. by backspace over formatting char)
                // Try to keep cursor relative, this is tricky
                // For simplicity, can just set to end if backspacing significantly changes format
            }
             if (cursorPos !== null && cursorPos > newValue.length) {
                cursorPos = newValue.length;
            }
            e.target.selectionStart = cursorPos;
            e.target.selectionEnd = cursorPos;
        });
        
        // Add leading parenthesis on focus if empty, to guide user
        phoneInput.addEventListener('focus', function(e) {
            if (!this.value) {
                this.value = '(';
            }
        });
        
        // Handle backspace to allow deleting the initial '('
        phoneInput.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '(') {
                // Allow backspacing the initial '('
                // No, this will be handled by input event: this.value = '';
            }
        });
    } else {
        console.warn(`Phone input field with ID '${inputId}' not found. Skipping phone formatting initialization.`);
    }
} 