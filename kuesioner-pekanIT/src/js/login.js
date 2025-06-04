// Handle login form submission
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const nis = document.getElementById('nis').value;
    const success = await handleLogin(nis);
    if (success) {
        window.location.href = 'kuesioner.html'; // Redirect to main page
    } else {
        alert('Login failed. Please check your NIS and try again.');
    }
});

const api = 'https://be-kuesioner.synchronizeteams.my.id';

// Login function
async function handleLogin(nis) {
    try {
        const response = await fetch(`${api}/api/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nis })
        });

        const data = await response.json();

        if (data.success) {
            // Store user data in localStorage
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userId', data.data.user_id);
            localStorage.setItem('userName', data.data.name);
            localStorage.setItem('userClass', data.data.kelas);

            return true;
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('userToken');
    if (token) {
        window.location.href = '/index.html';
        return;
    }
});
