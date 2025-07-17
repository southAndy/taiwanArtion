/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        hot: "url('/src/assets/images/hot-bg.png')",
      },
      colors: {
        // 你的自定義顏色
      },
      boxShadow: {
        banner: '0px 1px 8px 0px #0000001A',
      },
      screens: {
        tablet: '768px',
        desktop: '1280px',
        'desktop-xl': '1440px',
      },
    },
  },
  plugins: [],
}
