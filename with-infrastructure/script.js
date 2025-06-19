const VALID_EMAIL = "user@example.com";
const VALID_PASSWORD = "12345678";


let currentLang = localStorage.getItem("language") || "en";
let currentMessageKey = null;

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
  
    if (!email || !password) {
        showMessage("fillAllFields");
        shakeForm();
        return;
    }
  
    if (!isValidEmailOrPhone(email)) {
        showMessage("invalidEmailPhone");
        shakeForm();
        return;
    }
  
    if (!isValidPassword(password)) {
      showMessage("invalidPassword");
      shakeForm();
      return;
    }
  
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      saveUserData(email);
      showMessage("loginSuccess", "success");
    } else {
      showMessage("loginFail");
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
const showMessage = (key, type = "error") => {
    currentMessageKey = key;
    message.textContent = translations[currentLang][key];
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
}

// --- Показ или скрытие пароля ---
togglePasswordBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    togglePasswordBtn.textContent = isHidden ? "Hide" : "Show";
});

// Элементы для перевода
const elementsToTranslate = {
    welcome: document.querySelector(".header-title"),
    signIn: document.getElementById("form-title"),
    continueWithGoogle: document.querySelector('button[aria-label="Continue with Google"] .social-content'),
    signInWithApple: document.querySelector('button[aria-label="Sign in with Apple"] .social-content'),
    or: document.querySelector(".divider span"),
    emailOrPhone: document.getElementById("email"),
    password: document.getElementById("password"),
    forgotPassword: document.getElementById("forgot-password"),
    keepLoggedInLabel: document.querySelector('label[for="remember"]'),
    signInButton: document.getElementById("login-button"),
    registerMessage: document.querySelector(".register-message a"),
    togglePasswordBtn: document.getElementById("toggle-password"),
    footer: document.getElementById("footer-text"),

  };
  
  const languageToggle = document.getElementById("language-toggle");
  
  function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
  
    elementsToTranslate.welcome.textContent = t.welcome;
    elementsToTranslate.signIn.textContent = t.signIn;
    setTextAfterIcon(elementsToTranslate.continueWithGoogle, t.continueWithGoogle);
    setTextAfterIcon(elementsToTranslate.signInWithApple, t.signInWithApple);
    elementsToTranslate.or.textContent = t.or;
    elementsToTranslate.emailOrPhone.placeholder = t.emailOrPhone;
    elementsToTranslate.password.placeholder = t.password;
    elementsToTranslate.forgotPassword.textContent = t.forgotPassword;
    elementsToTranslate.keepLoggedInLabel.textContent = t.keepLoggedIn;
    elementsToTranslate.signInButton.textContent = t.signInButton;
    elementsToTranslate.registerMessage.textContent = t.newJoin;
    elementsToTranslate.togglePasswordBtn.textContent = elementsToTranslate.togglePasswordBtn.textContent === translations.en.show ? t.show : t.hide;
    elementsToTranslate.footer.textContent = t.footer;
    
    if (currentMessageKey) {
        message.textContent = t[currentMessageKey];
        message.style.color = message.style.color; 
    }

  }
  
  function setTextAfterIcon(spanElement, text) {
    const img = spanElement.querySelector('img');
    while (img.nextSibling) {
      spanElement.removeChild(img.nextSibling);
    }
    spanElement.appendChild(document.createTextNode(' ' + text));
  }
  
  // Сохраняем выбор пользователя
  function saveLanguage(lang) {
    localStorage.setItem("language", lang);
  }
  
  // Загружаем язык из localStorage или по умолчанию
  function loadLanguage() {
    currentLang = localStorage.getItem("language") || "en";
    languageToggle.checked = currentLang === "ru";
    setLanguage(currentLang);
  }
  
  // Обработчик переключения
  languageToggle.addEventListener("change", () => {
    currentLang = languageToggle.checked ? "ru" : "en";
    setLanguage(currentLang);
    saveLanguage(currentLang);
  });
  
  // Инициализация при загрузке страницы
  window.addEventListener("load", () => {
    loadLanguage();
  });
  