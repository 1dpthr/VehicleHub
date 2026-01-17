// Signup Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    if (UserAuth.currentUser || localStorage.getItem('vehiclehub_currentUser')) {
        window.location.href = 'homePage.html';
    }
});

async function handleSignup(event) {
    event.preventDefault();
    const form = event.target;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return false;
    }
    
    const userData = {
        username: form.username.value,
        email: form.email.value,
        password: password,
        phone: form.phone.value
    };
    
    // Try server API first, fallback to localStorage
    try {
        // Create AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('vehiclehub_token', data.token);
            localStorage.setItem('vehiclehub_currentUser', JSON.stringify(data.user));
            showNotification('Account created successfully!');
            setTimeout(() => {
                window.location.href = 'homePage.html';
            }, 1500);
            return false;
        } else {
            showNotification(data.message, 'error');
        }
    } catch (error) {
        // Server not available - use localStorage fallback
        // Silently handle network errors
        if (error.name !== 'AbortError' && error.name !== 'TypeError') {
            console.warn('Server connection failed, using local storage');
        }
        
        const success = UserAuth.signup(userData.username, userData.email, userData.password);
        
        if (success) {
            setTimeout(() => {
                window.location.href = 'homePage.html';
            }, 1500);
        }
    }
    
    return false;
}

window.signupFunctions = {
    handleSignup
};

