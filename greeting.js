document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");
    const greetingDiv = document.getElementById("userGreeting");
  
    if (username && greetingDiv) {
      greetingDiv.innerText = `Hi, ${username}!👋`;
    }
  });
  