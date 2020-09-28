const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:3003",
      pathRewrite(path) {
        return path.replace(/^\/api([^?]+)/, "$1.json");
      },
    })
  );
  // app.use(proxy('/api', {
  //     target: 'http://localhost:3003'
  // }));
};
