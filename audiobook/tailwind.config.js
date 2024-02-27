/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                eczar: ["Eczar", "serif"],
            },
            backgroundImage: {
                "hero-pattern":
                    "url('https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg')",
            },
            colors: {

                "d-bg-100": '#121212',
                "d-bg-200": '#282828',
                "d-bg-300": '#3f3f3f',
                "d-bg-400": '#575757',
                "d-bg-500": '#717171',
                "d-bg-600": '#8b8b8b',
                
                "d-primary-500": '#ba9ffb',
                "d-primary-400": '#9171f8',
                "d-primary-300": '#7a5af5',
                "d-primary-200": '#5e43f3',
            
            },
        },


    },
    plugins: [],
};
