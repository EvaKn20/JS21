export function renderHome(app, logout) {
    const currentUser = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null;

    app.innerHTML = `
        <h1>Добро пожаловать, ${currentUser.login}!</h1>
        <button id="profile">Личный кабинет</button>
        <button id="logout">Выйти</button>
    `;
    document.querySelector('#profile').addEventListener('click', () => {
        location.pathname = "/profile";
    })
    document.querySelector("#logout").addEventListener("click", logout);
}