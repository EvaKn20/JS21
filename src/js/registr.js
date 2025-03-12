export function renderRegister(app) {
    app.innerHTML = `
        <h1>Регистрация</h1>
        <form id="register-form">
            <input type="text" id="new-login" name='login' placeholder="Придумайте логин" required>
            <input type="password" id="new-password" name='password' placeholder="Придумайте пароль" required>
            <p id="register-error" class="error"></p>
            <button type="submit" id='reg'>Зарегистрироваться</button>
        </form>
    `;
    initSubmit();
}

function initSubmit() {
    const form = document.querySelector("#register-form");
    form.addEventListener("submit", submitForm);
}

function submitForm(event) {
    event.preventDefault();
    const { login, password } = event.target.elements;
    const loginValue = login.value;
    const passwordValue = password.value;

    const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    if (users.find(u => u.login === loginValue)) {
        document.querySelector("#register-error").textContent = "Этот логин уже занят";
        return;
    }

    const newUser = { login: loginValue, password: passwordValue };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users)); // Сохраняем новых пользователей
    localStorage.setItem("currentUser", JSON.stringify(newUser)); // Сразу авторизуем нового пользователя
    location.pathname = "/";
}
