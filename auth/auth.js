const STORAGE_KEY = "classhub_users";
const SESSION_KEY = "classhub_current_user";

async function hashPassword(password) {
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

function loadUsers() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function findUser(username) {
  const users = loadUsers();
  return users.find(u => u.username.toLowerCase() === username.toLowerCase()) || null;
}

function setCurrentUser(username) {
  localStorage.setItem(SESSION_KEY, username);
}

function getCurrentUser() {
  const username = localStorage.getItem(SESSION_KEY);
  if (!username) return null;
  return findUser(username);
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
}

// REGISTER
async function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const fullname = document.getElementById("fullname").value.trim();
  const password = document.getElementById("password").value;
  const birthdate = document.getElementById("birthdate").value;

  if (!username || !fullname || !password || !birthdate) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const existing = findUser(username);
  if (existing) {
    alert("Ce nom d'utilisateur est déjà utilisé.");
    return;
  }

  const passwordHash = await hashPassword(password);

  const users = loadUsers();
  users.push({
    username,
    fullname,
    passwordHash,
    birthdate,
    createdAt: new Date().toISOString()
  });
  saveUsers(users);

  alert("Compte créé avec succès. Vous pouvez maintenant vous connecter.");
  window.location.href = "login.html";
}

// LOGIN
async function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Veuillez entrer votre nom d'utilisateur et votre mot de passe.");
    return;
  }

  const user = findUser(username);
  if (!user) {
    alert("Utilisateur introuvable.");
    return;
  }

  const passwordHash = await hashPassword(password);
  if (passwordHash !== user.passwordHash) {
    alert("Mot de passe incorrect.");
    return;
  }

  setCurrentUser(user.username);
  window.location.href = "../index.html";
}

window.handleRegister = handleRegister;
window.handleLogin = handleLogin;
window.getCurrentUser = getCurrentUser;
window.logout = logout;
