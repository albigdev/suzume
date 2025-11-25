import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

/*
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
<link
  href="https://fonts.googleapis.com/css2?family=Sono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
*/

/* Colors adapted from https://tailwindcss.com/docs/customizing-colors */


:root,
:root.light-mode {
  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  /* Blue */
  --color-blue-50: #eff6ff;
  --color-blue-100: #e0f2fe;
  --color-blue-200: #bae6fd;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-700: #0369a1;
  --color-blue-800: #075985;
  --color-blue-900: #0c4a6e;

    /* Red */
  --color-red-50: #fef2f2;
  --color-red-100: #fee2e2;
  --color-red-200: #fecaca;
  --color-red-300: #fca5a5;
  --color-red-400: #f87171;
  --color-red-500: #ef4444;
  --color-red-600: #dc2626;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;
  --color-red-900: #7f1d1d;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
}

:root.dark-mode {
  /* Grey (inverted) */
  --color-grey-0: #111827;
  --color-grey-50: #1f2937;
  --color-grey-100: #374151;
  --color-grey-200: #4b5563;
  --color-grey-300: #6b7280;
  --color-grey-400: #9ca3af;
  --color-grey-500: #d1d5db;
  --color-grey-600: #e5e7eb;
  --color-grey-700: #f3f4f6;
  --color-grey-800: #f9fafb;
  --color-grey-900: #ffffff;

  /* Blue (dark mode optimized) */
  --color-blue-50: #0c4a6e;
  --color-blue-100: #075985;
  --color-blue-200: #0369a1;
  --color-blue-500: #2563eb;
  --color-blue-600: #3b82f6;
  --color-blue-700: #60a5fa;
  --color-blue-800: #93c5fd;
  --color-blue-900: #dbeafe;

    /* Red */
  --color-red-50: #fef2f2;
  --color-red-100: #fee2e2;
  --color-red-200: #fecaca;
  --color-red-300: #fca5a5;
  --color-red-400: #f87171;
  --color-red-500: #ef4444;
  --color-red-600: #dc2626;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;
  --color-red-900: #7f1d1d;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
margin: 0;
}

*:disabled {
    cursor: not-allowed;
}

html {
    font-size: 62.5%;
}

body {
    font-family: 'Poppins', sans-serif;
    color: var(--color-grey-700);
    transition: color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
}

input, button, textarea, select {
    font-family: inherit;
    color: inherit;
}

input:focus,
button:focus,
textarea:focus,
select:focus {
    outline: 2px solid var(--color-blue-500);
    outline-offset: -1px;
}

select:disabled,
input:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500)
}

button {
    cursor: pointer;
}

button:has(svg) {
    line-height: 0;
}

a {
    color: inherit;
    text-decoration: none;
}

ul {
    list-style: none;
}

p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
    hyphens: auto;
}

img {
    max-width: 100%;
}

`;

export default GlobalStyles;
