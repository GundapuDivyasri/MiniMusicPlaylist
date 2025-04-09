document.getElementById("signupForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  alert(data.message || "Signup successful!");
  if (res.ok) {
    window.location.href = "login.html";
}
});


document.getElementById("loginForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Login successful!");
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.name);
    localStorage.setItem("loggedIn", "true"); 
    window.location.href = "index.html"; 
  } else {
    alert(data.message || "Login failed");
  }
}); 

// Show Greeting on Homepage
window.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const username = localStorage.getItem("username");
  const nameElement = document.getElementById("userGreeting");
  const loginLink = document.getElementById("loginLink");
  const signupLink = document.getElementById("signupLink");
  const logoutLink = document.getElementById("logoutLink");

  if (isLoggedIn === "true" && username && nameElement && window.location.pathname.includes("index.html")) {
    nameElement.textContent = `Hi, ${username}`;

    if (loginLink) loginLink.style.display = "none";
    if (signupLink) signupLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "inline";
  } else {
    // If not logged in, hide greeting and show login/signup
    if (nameElement) nameElement.textContent = "";
    if (loginLink) loginLink.style.display = "inline";
    if (signupLink) signupLink.style.display = "inline";
    if (logoutLink) logoutLink.style.display = "none";
  }
  if (logoutLink) {
    logoutLink.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("loggedIn"); // ✅ also remove this
      window.location.href = "index.html";
    });
  }
  
});



  
 