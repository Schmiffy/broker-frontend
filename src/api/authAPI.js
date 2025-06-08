// This is a fake API to simulate backend authentication.
// In a real app, this would be an actual HTTP client (like axios or fetch).

export const fakeAuthAPI = {
    /**
     * @param {string} email
     * @param {string} password
     * @returns {Promise<string>} A fake JWT token
     */
    login: (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'test@example.com' && password === 'password') {
                    // In a real app, the server would return a JWT.
                    const fakeToken = `fake-jwt-token-for-${email}-${Date.now()}`;
                    resolve({ token: fakeToken });
                } else {
                    reject(new Error('Invalid email or password.'));
                }
            }, 500); // Simulate network delay
        });
    },

    /**
     * @param {string} email
     * @param {string} password
     * @returns {Promise<string>} A fake JWT token
     */
    signup: (email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // In a real app, the server would create a user and return a JWT.
                console.log(`Signed up user with email: ${email}`);
                const fakeToken = `fake-jwt-token-for-${email}-${Date.now()}`;
                resolve({ token: fakeToken });
            }, 500); // Simulate network delay
        });
    },
};