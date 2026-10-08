let currentToken = null;
const output = document.getElementById('output');
const authStatus = document.getElementById('auth-status');

function updateUI(data, status) {
    output.textContent = `HTTP Status: ${status}\n\n` + JSON.stringify(data, null, 2);
}

async function apiRequest(url, options = {}) {
    options.headers = options.headers || {};
    options.headers['Content-Type'] = 'application/json';
    
    if (currentToken) {
        options.headers['Authorization'] = `Bearer ${currentToken}`;
    }

    try {
        const res = await fetch(url, options);
        const data = await res.json();
        updateUI(data, res.status);
    } catch (err) {
        updateUI({ error: err.message }, 'Network Error');
    }
}

// Auth Listeners
document.getElementById('login-user-btn').addEventListener('click', async () => {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'user' })
    });
    const data = await res.json();
    if (data.token) {
        currentToken = data.token;
        authStatus.className = 'badge bg-primary';
        authStatus.textContent = 'Status: Authenticated (Researcher)';
    }
    updateUI(data, res.status);
});

document.getElementById('login-admin-btn').addEventListener('click', async () => {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'admin' })
    });
    const data = await res.json();
    if (data.token) {
        currentToken = data.token;
        authStatus.className = 'badge bg-success';
        authStatus.textContent = 'Status: Authenticated (Admin)';
    }
    updateUI(data, res.status);
});

document.getElementById('clear-token-btn').addEventListener('click', () => {
    currentToken = null;
    authStatus.className = 'badge bg-secondary';
    authStatus.textContent = 'Status: Anonymous (No Token)';
    updateUI({ message: 'Token cleared from client memory.' }, 200);
});

// Request Listeners
document.getElementById('get-all-btn').addEventListener('click', () => apiRequest('/api/initiatives'));
document.getElementById('get-one-btn').addEventListener('click', () => apiRequest('/api/initiatives/1'));
document.getElementById('delete-admin-btn').addEventListener('click', () => apiRequest('/api/initiatives/1', { method: 'DELETE' }));
document.getElementById('trigger-404-btn').addEventListener('click', () => apiRequest('/api/unknown-route'));

document.getElementById('post-init-btn').addEventListener('click', () => {
    const title = document.getElementById('init-title').value;
    const priority = document.getElementById('init-priority').value;
    apiRequest('/api/initiatives', {
        method: 'POST',
        body: JSON.stringify({ title, priority })
    });
});