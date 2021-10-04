module.exports = {
  purge: [

    './resources/**/*.blade.php',
    './resources/**/*.js'

  ],
  darkMode: false, 
  theme: {
    extend: {
      colors:{
       brand:{
         1: "#14213d",
         2: "#fca311",
         3: "#14213d",
         4: "#e5e5e5",
       }
      }
    },
  },
  variants: {
    extend: {
      borderRadius: ['hover', 'focus'],
    },
  },
  plugins: [],
}
