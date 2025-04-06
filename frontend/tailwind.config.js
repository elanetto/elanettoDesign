/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        ph: "480px",
        sm: "500px",
        md: "600px",
        lg: "756px",
        xl: "1200px",
      },
      colors: {
        primary: "#DB6861",
        "primary-hover": "#E77973",
        secondary: "#FDEDF2",
        accent: "#61B5DB",
        "primary-text": "#FFFFFF",
        "secondary-text": "#6B7280",
      },
      fontFamily: {
        fredoka: ["Fredoka", "sans-serif"],
      },
      fontSize: {
        header: "24px",
        paragraph: "14px",
      },
    },
  },
  plugins: [],
};
