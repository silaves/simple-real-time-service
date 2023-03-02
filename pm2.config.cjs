module.exports = [
  {
    name: 'simple-real-time-service',
    script: 'dist/index.js',
    watch: false,
    env: {
      NODE_ENV: 'production',
      DEBUG: 'false'
    }
  }
]
