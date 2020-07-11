module.exports = {
  theme: {
    extend: {
      width: {
        '500': '500px',
        '250': '250px',
      },
      height: {
        '500': '500px',
        '250': '250px',
        '10px': '10px',
        '20px': '20px',
        '40px': '40px',
      },
      variants: {
        borderWidth: ['responsive', 'hover'],
      }
    }
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
