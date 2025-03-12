import './style/style.css';
import { renderHome } from "./js/home.js";
import { renderAuth } from "./js/auth.js";
import { renderRegister } from "./js/registr.js";
import {renderProfile} from './js/profile.js';

const app = document.querySelector("#app");

// Проверяем, авторизован ли пользователь
function checkAuth() {
    return localStorage.getItem("currentUser") !== null;
}

// Выход из аккаунта - удаляем текущего пользователя и перенаправляем на страницу авторизации
function logout() {
    localStorage.removeItem("currentUser");
    location.pathname = "/auth";
}

    const isAuthenticated = checkAuth();
    switch (location.pathname) {
        case "/":
            if (isAuthenticated) {
                renderHome(app, logout);
            } 
            else {
                location.pathname = "/auth";
            }
            break;
        case "/auth":
            renderAuth(app);
            break;
        case "/register":
            renderRegister(app);
            break;
        case '/profile':
            if (isAuthenticated) {
                renderProfile(app);
            } else {
                location.pathname = "/auth";
            }
            break;
        default:
            app.innerHTML = "<h1>404 Not Found</h1>";
    }







