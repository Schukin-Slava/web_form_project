# Форма авторизации — реализация на нативных технологиях с инфрастуктурой

![form_screenshot](https://github.com/user-attachments/assets/b3afeec6-6c0c-40f5-a39b-32755897b318)

## Задание 2: Подключаем инфраструктуру (24 балла). Реализация формы авторизации с подключением инфрастуктуры

Сайт для запуска: [**Сылка**](https://schukin-slava.github.io/web_form_project/with-infrastructure/ "сайт").

<table>
  <tr>
    <td>Почта</td>
    <td>user@example.com</td>
  </tr>
  <tr>
    <td>Пароль</td>
    <td>12345678</td>
  </tr>
</table>

---

## ✅**1. (_+ 3 балла_) Менеджер пакетов**

- Установлен менеджер пакетов `npm` (через `npm init`)
- ❓ _`npm` —\_стандартный и наиболее распространённый менеджер для Node.js, входит в дистрибутив по умолчанию. Он гарантирует совместимость с большинством библиотек и инструментов в экосистеме JS._

---

## ✅**2. (_+ 2 балла_) Node.js и nvm (2 балла)**

\*Фиксация версии Node.js с помощью `.nvmrc`:

---

## ✅**2. (_+ 4 балла_) Подключение TypeScript**

✅ Установка и инициализация:

```bash
npm install --save-dev typescript
npx tsc --init
```

✅ Настроен `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

❓ **Обоснование**:
Строгая конфигурация помогает ловить ошибки на раннем этапе разработки и улучшает надёжность.

✅ Добавлена команда проверки типов:

```jsonc
"scripts": {
  "type-check": "tsc --noEmit"
}
```

---

## D. Сборщик и дев-сервер (4 балла)

✅ Установлен `Vite`:

```bash
npm install --save-dev vite
```

✅ Команды:

```jsonc
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

❓ **Обоснование**:
`Vite` — современный и быстрый сборщик, идеально подходит для фронтенда. Мгновенная перезагрузка, поддержка TypeScript из коробки.

✅ Структура:

```
infrastructure/
├── index.html
├── src/
│   └── main.ts
├── vite.config.ts
```

---

## E. Линтер (3 балла)

✅ Установка `ESLint`:

```bash
npm install --save-dev eslint
npx eslint --init
```

✅ Добавлены команды:

```jsonc
"scripts": {
  "lint": "eslint src",
  "lint:fix": "eslint src --fix"
}
```

❓ **Обоснование**:
Используется стандартная конфигурация с поддержкой TypeScript и импортов. ESLint — индустриальный стандарт.

---

## F. Форматтер (3 балла)

✅ Установка `Prettier`:

```bash
npm install --save-dev prettier
```

✅ Конфигурация `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80
}
```

✅ Команда:

```jsonc
"scripts": {
  "format": "prettier --write ."
}
```

❓ **Обоснование**:
Prettier упрощает работу в команде, исключая споры о стиле кода.

---

## G. Тестирование (5 баллов)

✅ Установка `Vitest`:

```bash
npm install --save-dev vitest
```

✅ Конфигурация `vite.config.ts`:

```ts
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
});
```

✅ Пример теста:

```ts
// src/__tests__/email.test.ts
import { isValidEmailOrPhone } from "../utils";

test("valid email", () => {
  expect(isValidEmailOrPhone("user@example.com")).toBe(true);
});
```

✅ Команда:

```jsonc
"scripts": {
  "test": "vitest"
}
```

❓ **Обоснование**:
`Vitest` идеально сочетается с Vite и TypeScript, быстрый, поддерживает JSDOM и снабжен приятным API.

---
