/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins-Regular", "sans-serif"], // Corrected "san-serif" to "sans-serif"
        "poppins-black": ["Poppins-Black", "sans-serif"],
        "poppins-bold": ["Poppins-Bold", "sans-serif"],
        "poppins-extraBold": ["Poppins-ExtraBold", "sans-serif"],
        "poppins-extraLight": ["Poppins-ExtraLight", "sans-serif"],
        "poppins-light": ["Poppins-Light", "sans-serif"],
        "poppins-medium": ["Poppins-Medium", "sans-serif"],
        "poppins-semibold": ["Poppins-SemiBold", "sans-serif"],
      },
      colors: {
        primary: {
          100:"#94C5CC",
          200:"#90caf9",
          300:'#FFFFFF' // Added #
        },
        accent: {
          100: "#FBFBFD", // Added #
        },
        black: {
          DEFAULT: "#000000",
          100:'#8c8e98',
          200:'#666876',
          300:'#191d31',
        },
        danger:'#f75555',
      },
    },
  },
  plugins: [],
};
