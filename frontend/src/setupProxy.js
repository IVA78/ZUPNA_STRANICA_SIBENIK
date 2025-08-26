const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  try {
    app.use(
      "/api",
      createProxyMiddleware({
        target: "https://zupna-stranica-sibenik-b.onrender.com",
        changeOrigin: true,
      })
    );
  } catch (err) {
    console.log(err);
  }
};
