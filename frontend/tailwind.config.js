/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                ph: '480px',
                sm: '500px',
                md: '600px',
                lg: '756px',
                xl: '1200px'
            },
        },
    },
    plugins: [],
};
