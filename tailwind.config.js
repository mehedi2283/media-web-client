/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
        {
            mytheme: {
                primary: "#00AEAE",

                secondary: "#7dd3fc",

                accent: "#94FFFF",

                neutral: "#211A29",

                "base-100": "#ffffff",

                info: "#509EE7",

                success: "#0C6949",

                warning: "#AA6F09",

                error: "#DF263E",
            },
        },
    ],
},
  plugins: [require("daisyui")],
}
