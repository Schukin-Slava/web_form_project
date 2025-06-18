const VALID_EMAIL = "user@example.com";
const VALID_PASSWORD = "12345678";

// --- Получение элементов ---
const form = document.getElementById("login-form");
const message = document.getElementById("message");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("toggle-password");

// --- Обработчик формы ---
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!isValidEmailOrPhone(email)) {
        showMessage("Введите корректный email или телефон");
        shakeForm();
        return;
    }

    if (!isValidPassword(password)) {
        showMessage("Пароль должен быть от 6 до 20 символов без пробелов");
        shakeForm();
        return;
    }

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        saveUserData(email);
        showMessage("Успешный вход!", "success");
    } else {
        showMessage("Неверный логин или пароль");
        shakeForm();
    }
});

// --- Валидация email и телефона ---
function isValidEmailOrPhone(input) {
    const trimmed = input.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?\d{1,3})?[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{2,4}[\s\-]?\d{2,4}[\s\-]?\d{0,4}$/;

    return emailRegex.test(trimmed) || phoneRegex.test(trimmed);
}

// --- Валидация пароля ---
const isValidPassword = (pwd) => {
    return pwd.length >= 6 && pwd.length <= 20 && !/\s/.test(pwd);
};

// --- Отображение сообщения ---
const showMessage = (text, type = "error") => {
    message.textContent = text;
    message.style.color = type === "success" ? "green" : "red";
};

// --- Отображение анимации тряски формы ---
const shakeForm = () => {
    form.classList.remove("shake");

    form.style.animation = "none";
    void form.offsetWidth; // Ререндер принудительно
    form.style.animation = "shake 0.5s ease";
};

form.addEventListener("animationend", () => {
    if (form.style.animation.includes("shake")) {
        form.style.animation = "none";
    }
});

// --- Сохранение данных ---
function saveUserData(email) {
    localStorage.setItem("lastLogin", JSON.stringify({ email }));
    // Можно использовать sessionStorage, если нужна временность
}

// --- Показ или скрытие пароля ---
togglePasswordBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    togglePasswordBtn.textContent = isHidden ? "Hide" : "Show";
});

