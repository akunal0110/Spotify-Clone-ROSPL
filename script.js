// ============================
// LOGIN & SIGNUP MODALS
// ============================

// Elements
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginBtn = document.querySelector('.topbar .navbar button');
const signupLinks = document.querySelectorAll('.topbar .navbar ul li a');
const closeBtns = document.querySelectorAll('.modal .close');

// Open Login Modal
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

// Open Signup Modal
signupLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.style.display = 'block';
    });
});

// Close Modal on clicking X
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.parentElement.style.display = 'none';
    });
});

// Close Modal on clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.style.display = 'none';
    if (e.target === signupModal) signupModal.style.display = 'none';
});

// ============================
// LOCAL STORAGE FUNCTIONS
// ============================

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function findUser(email, password) {
    const users = getUsers();
    return users.find(user => user.email === email && user.password === password);
}

// ============================
// FORM SUBMISSION WITH AUTHENTICATION
// ============================

// Signup form submit
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;

    if (!name || !email || !password) {
        alert('Please fill all fields!');
        return;
    }

    // Check if user already exists
    const users = getUsers();
    if (users.some(user => user.email === email)) {
        alert('Email already registered!');
        return;
    }

    saveUser({ name, email, password });
    alert(`Account created for ${name}! You can now log in.`);
    signupModal.style.display = 'none';
    document.getElementById('signupForm').reset();
});

// Login form submit
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const user = findUser(email, password);
    if (user) {
        alert(`Welcome back, ${user.name}!`);
        loginModal.style.display = 'none';
        document.getElementById('loginForm').reset();
        // Optional: save login state
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    } else {
        alert('Invalid email or password!');
    }
});
