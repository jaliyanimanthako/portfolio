/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                main: ['Inter', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
            },
            colors: {
                cyan: {
                    400: '#00d4ff',
                    500: '#00d4ff',
                },
                blue: {
                    500: '#0099ff',
                    600: '#0099ff',
                },
            },
        },
    },
    plugins: [],
}
