const allowedOrigins = [
    process.env.NODE_ENV === 'production' ? 'https://worksheeps.onrender.com' : 'http://localhost:3000',
    process.env.NODE_ENV === 'production' ? 'https://worksheeps.tech' : null
];

module.exports = allowedOrigins;