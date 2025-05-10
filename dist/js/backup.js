/**
 * Backup system for form submissions
 * Stores form submissions in a JSON file for backup purposes
 */

class FormBackup {
    constructor() {
        this.backupFile = 'form-submissions.json';
        this.maxBackups = 1000; // Maximum number of submissions to keep
    }

    /**
     * Adds a new form submission to the backup
     * @param {Object} formData - The form submission data
     * @returns {Promise<boolean>} - Whether the backup was successful
     */
    async backupSubmission(formData) {
        try {
            // Get existing submissions
            const submissions = await this.getSubmissions();
            
            // Add timestamp and ID to the submission
            const submission = {
                id: this.generateId(),
                timestamp: new Date().toISOString(),
                ...formData
            };
            
            // Add new submission to the beginning of the array
            submissions.unshift(submission);
            
            // Keep only the most recent submissions
            if (submissions.length > this.maxBackups) {
                submissions.length = this.maxBackups;
            }
            
            // Save updated submissions
            await this.saveSubmissions(submissions);
            
            console.log('Form submission backed up successfully');
            return true;
        } catch (error) {
            console.error('Error backing up form submission:', error);
            return false;
        }
    }

    /**
     * Retrieves all backed up submissions
     * @returns {Promise<Array>} - Array of submissions
     */
    async getSubmissions() {
        try {
            const response = await fetch(this.backupFile);
            if (!response.ok) {
                return [];
            }
            return await response.json();
        } catch (error) {
            console.error('Error reading submissions:', error);
            return [];
        }
    }

    /**
     * Saves submissions to the backup file
     * @param {Array} submissions - Array of submissions to save
     * @returns {Promise<void>}
     */
    async saveSubmissions(submissions) {
        try {
            const response = await fetch(this.backupFile, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissions, null, 2)
            });
            
            if (!response.ok) {
                throw new Error('Failed to save submissions');
            }
        } catch (error) {
            console.error('Error saving submissions:', error);
            throw error;
        }
    }

    /**
     * Generates a unique ID for a submission
     * @returns {string} - Unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// Export the FormBackup class
window.FormBackup = FormBackup; 