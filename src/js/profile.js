export function renderProfile(app) {
    const currentUser = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null;

    app.innerHTML = `
        <h1>Профиль</h1>
        <form id="profile-form">
            <input type="text" id="new-login" name='login' placeholder="Новый логин" value="${currentUser.login}" required>
            <input type="password" id="new-password" name='password' placeholder="Новый пароль" value="${currentUser.password}"required>
            <p id="profile-error" class="error"></p>
            <button type="submit">Сохранить изменения</button>
        </form>
        <a href="/">
            <button id="home">На главную</button>
        </a>
    `;

    initSubmit();
}

function initSubmit() {
    const form = document.querySelector("#profile-form");
    form.addEventListener("submit", submitForm);
}

function submitForm(event) {
    event.preventDefault();
    const { login, password } = event.target.elements;
    const newLogin = login.value;
    const newPassword = password.value;

    const users = JSON.parse(localStorage.getItem("users"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Проверяем, не занят ли новый логин другим пользователем
    if (users.find(u => u.login === newLogin && u.login !== currentUser.login)) {
        document.querySelector("#profile-error").textContent = "Этот логин уже занят";
        return;
    }

    // Обновляем данные пользователя
    const updatedUser = { login: newLogin, password: newPassword };
    const updatedUsers = users.map(u => u.login === currentUser.login ? updatedUser : u);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    location.pathname = "/";
}