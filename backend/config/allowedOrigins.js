const allowedOrigins = [
    process.env.NODE_ENV === 'production' ? 'https://worksheeps.onrender.com' : 'http://localhost:3000'
];

module.exports = allowedOrigins;