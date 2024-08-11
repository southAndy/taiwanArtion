/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,tsx}"], // detect what files to look at
  theme: {
    extend: {
      backgroundImage: {
        'hot': "url('/src/assets/images/hot-bg.png')",
      },
      // website's system color
      colors:{

      }
    },
  },
  plugins: [],
};
