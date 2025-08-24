module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Optimizaciones para hidratación
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
