// --- Типизация translations ---
type Language = "en" | "ru";

type TranslationKeys =
  | "welcome"
  | "signIn"
  | "continueWithGoogle"
  | "signInWithApple"
  | "or"
  | "emailOrPhone"
  | "password"
  | "forgotPassword"
  | "keepLoggedIn"
  | "signInButton"
  | "newJoin"
  | "invalidEmailPhone"
  | "invalidPassword"
  | "fillAllFields"
  | "loginSuccess"
  | "loginFail"
  | "show"
  | "hide"
  | "footer";

type Translations = {
  [lang in Language]: {
    [key in TranslationKeys]: string;
  };
};

// --- Константы ---
const VALID_EMAIL = "user@example.com";
const VALID_PASSWORD = "12345678";

let currentLang: Language = (localStorage.getItem("language") as Language) || "en";
let currentMessageKey: TranslationKeys | null = null;

// --- Элементы DOM ---
const form = document.getElementById("login-form") as HTMLFormElement;
const message = document.getElementById("message")!;
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const togglePasswordBtn = document.getElementById("toggle-password") as HTMLButtonElement;
const languageToggle = document.getElementById("language-toggle") as HTMLInputElement;

// --- Переводимые элементы ---
const elementsToTranslate = {
  welcome: document.querySelector(".header-title")!,
  signIn: document.getElementById("form-title")!,
  continueWithGoogle: document.querySelector('button[aria-label="Continue with Google"] .social-content')!,
  signInWithApple: document.querySelector('button[aria-label="Sign in with Apple"] .social-content')!,
  or: document.querySelector(".divider span")!,
  emailOrPhone: emailInput,
  password: passwordInput,
  forgotPassword: document.getElementById("forgot-password")!,
  keepLoggedInLabel: document.querySelector('label[for="remember"]')!,
  signInButton: document.getElementById("login-button")!,
  registerMessage: document.querySelector(".register-message a")!,
  togglePasswordBtn,
  footer: document.getElementById("footer-text")!
};

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

// --- Проверка email/телефона ---
function isValidEmailOrPhone(input: string): boolean {
  const trimmed = input.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\+?\d{1,3})?[\s-]?\(?\d{1,4}\)?[\s-]?\d{2,4}[\s-]?\d{2,4}[\s-]?\d{0,4}$/;
  return emailRegex.test(trimmed) || phoneRegex.test(trimmed);
}

// --- Проверка пароля ---
function isValidPassword(pwd: string): boolean {
  return pwd.length >= 6 && pwd.length <= 20 && !/\s/.test(pwd);
}

// --- Отображение сообщений ---
function showMessage(key: TranslationKeys, type: "error" | "success" = "error") {
  currentMessageKey = key;
  message.textContent = translations[currentLang][key];
  message.style.color = type === "success" ? "green" : "red";
}

// --- Анимация формы при ошибке ---
function shakeForm() {
  form.classList.remove("shake");
  form.style.animation = "none";
  void form.offsetWidth;
  form.style.animation = "shake 0.5s ease";
}

form.addEventListener("animationend", () => {
  if (form.style.animation.includes("shake")) {
    form.style.animation = "none";
  }
});

// --- Сохранение данных пользователя ---
function saveUserData(email: string) {
  localStorage.setItem("lastLogin", JSON.stringify({ email }));
}

// --- Переключение видимости пароля ---
togglePasswordBtn.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePasswordBtn.textContent = isHidden
    ? translations[currentLang].hide
    : translations[currentLang].show;
});

// --- Установка языка ---
function setLanguage(lang: Language) {
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
  elementsToTranslate.togglePasswordBtn.textContent =
    passwordInput.type === "password" ? t.show : t.hide;
  elementsToTranslate.footer.textContent = t.footer;

  if (currentMessageKey) {
    message.textContent = t[currentMessageKey];
  }
}

function setTextAfterIcon(spanElement: Element, text: string) {
  const img = spanElement.querySelector("img");
  while (img && img.nextSibling) {
    spanElement.removeChild(img.nextSibling);
  }
  spanElement.appendChild(document.createTextNode(" " + text));
}

// --- Язык: сохранение и загрузка ---
function saveLanguage(lang: Language) {
  localStorage.setItem("language", lang);
}

function loadLanguage() {
  currentLang = (localStorage.getItem("language") as Language) || "en";
  languageToggle.checked = currentLang === "ru";
  setLanguage(currentLang);
}

// --- Переключение языка ---
languageToggle.addEventListener("change", () => {
  currentLang = languageToggle.checked ? "ru" : "en";
  setLanguage(currentLang);
  saveLanguage(currentLang);
});

// --- Инициализация ---
window.addEventListener("load", () => {
  loadLanguage();
});