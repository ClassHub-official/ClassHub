function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "auth/login.html";
    return null;
  }
  return user;
}

function initApp() {
  const user = requireAuth();
  if (!user) return;

  const userBlock = document.getElementById("user-block");
  userBlock.innerHTML = `
    <div><strong>${user.fullname}</strong></div>
    <div>@${user.username}</div>
  `;

  const links = document.querySelectorAll("[data-module]");
  const modules = document.querySelectorAll(".module");

  function activateModule(name) {
    modules.forEach(m => {
      m.style.display = m.dataset.module === name ? "block" : "none";
    });
    links.forEach(l => {
      if (l.dataset.module === name) {
        l.style.fontWeight = "bold";
      } else {
        l.style.fontWeight = "normal";
      }
    });
  }

  links.forEach(link => {
    link.addEventListener("click", () => {
      const name = link.dataset.module;
      activateModule(name);
    });
  });

  activateModule("dashboard");
}

function logoutAndBack() {
  logout();
  window.location.href = "auth/login.html";
}

document.addEventListener("DOMContentLoaded", initApp);
