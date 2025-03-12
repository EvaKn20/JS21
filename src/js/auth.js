export function renderAuth(app) {
    app.innerHTML = `
        <h1>Авторизация</h1>
        <form id="auth-form">
            <input type="text" id="login" name='login' placeholder="Логин" required>
            <input type="password" id="password" name='password' placeholder="Пароль" required>
            <p id="auth-error" class="error"></p>
            <button type="submit">Войти</button>
        </form>
        <a href='/register'>
            <button id="to-register">Регистрация</button>
        </a>
    `;
    initSubmit();
}

function initSubmit() {
    const form = document.querySelector("#auth-form");
    form.addEventListener("submit", submitForm);
}

function submitForm(event) {
    event.preventDefault();
    const { login, password } = event.target.elements;
    const loginValue = login.value;
    const passwordValue = password.value;

    const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    const user = users.find(u => u.login === loginValue && u.password === passwordValue);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        location.pathname = "/";
    } else {
        document.querySelector("#auth-error").textContent = "Неверный логин или пароль";
    }
}