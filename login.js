// Login Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    const currentUser = JSON.parse(localStorage.getItem('vehiclehub_currentUser') || 'null');
    const adminUser = JSON.parse(localStorage.getItem('vehiclehub_admin') || 'null');
    
    if (adminUser && adminUser.role === 'admin') {
        window.location.href = 'admin.html';
        return;
    }
    
    if (currentUser) {
        window.location.href = 'dashboard.html';
        return;
    }
});

// Admin credentials
const ADMIN_CREDENTIALS = {
    email: 'admin@vehiclehub.com',
    password: 'admin123'
};

async function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value;
    
    // Check if admin credentials FIRST
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        // Set admin session
        const adminUser = {
            id: 'admin-001',
            username: 'Administrator',
            email: email,
            role: 'admin',
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('vehiclehub_admin', JSON.stringify(adminUser));
        
        // Show success notification
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.innerHTML = '<span>Welcome, Administrator!</span><button onclick="this.parentElement.remove()">×</button>';
        notification.style.cssText = 'position: fixed; top: 80px; right: 20px; padding: 15px 25px; background: #4ecca3; color: #1a1a2e; border-radius: 8px; display: flex; align-items: center; gap: 15px; z-index: 9999;';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1500);
        
        return false;
    }
    
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('vehiclehub_token', data.token);
            localStorage.setItem('vehiclehub_currentUser', JSON.stringify(data.user));
            
            // Redirect based on role
            if (data.user.role === 'admin') {
                showNotification('Welcome back, Admin!');
                setTimeout(() => {
                    window.location.href = 'admin.html';
                }, 1500);
            } else {
                showNotification('Welcome back, ' + data.user.username + '!');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }
        } else {
            showNotification(data.message, 'error');
        }
    } catch (error) {
        console.log('MongoDB not available, using localStorage');
        const success = UserAuth.login(email, password);
        
        if (success) {
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }
    }
    
    return false;
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        if (toggleBtn) toggleBtn.textContent = '🔒';
    } else {
        passwordInput.type = 'password';
        if (toggleBtn) toggleBtn.textContent = '👁️';
    }
}

function socialLogin(provider) {
    showNotification(provider + ' login coming soon!', 'info');
}

window.loginFunctions = {
    handleLogin,
    togglePassword,
    socialLogin
};

