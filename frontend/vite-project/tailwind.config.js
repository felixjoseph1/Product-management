const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html", // Include the Vite entry HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all your project files
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // Include NextUI theme files
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // Enables class-based dark mode
  plugins: [nextui()], // Adds NextUI plugin for Tailwind
};
