let i = 0
function topText(name) {
    const topText = document.getElementById("top-text");
    const txt = "Welcome, " + name;
    for (let i = 0; i < txt.length; i++) {
        setTimeout(() => {
            topText.innerHTML += txt.charAt(i);
        }, 100 * i);
    }
}

let currentUser = null;

function login(event) {
    event.preventDefault();
    const inputField = document.getElementById("input");
    fetch("./users.json")
        .then(response => response.json())
        .then(data => {
            if (!currentUser) {
                const user = data.users.find(user => user.email === inputField.value);
                if (user) {
                    currentUser = user;
                    topText(user.name);
                    const userIcon = document.getElementById("avatar")
                    userIcon.src = user.image;
                    userIcon.style.visibility = "visible";
                    inputField.name = "password";
                    inputField.value = "";
                    inputField.placeholder = "Password";
                } else {
                    alert("Email is incorrect");
                }
            } else {
                if (currentUser.password === inputField.value) {
                    alert("Login successful");
                    // Here you can redirect the user or show some content
                } else {
                    alert("Password is incorrect");
                }
            }
        });
}