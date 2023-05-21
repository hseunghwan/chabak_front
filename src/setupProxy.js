const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://3.34.98.222:8080",
            changeOrigin: true,
        })
    );
};
