const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/map-geocode/v2/geocode",
        createProxyMiddleware({
            target: "https://naveropenapi.apigw.ntruss.com",
            changeOrigin: true,
        })
    );

    app.use(
        "/api/chatbot",
        createProxyMiddleware({
            target: "http://192.168.51.142:5000",
            changeOrigin: true,
        })
    );
};
