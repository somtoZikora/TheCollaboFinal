const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/user"
        ],
        target: "http://localhost:3000",
        secure: false
    }
]

module.exports = PROXY_CONFIG;
