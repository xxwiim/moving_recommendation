const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/recommendation/budget', {
      target: 'http://localhost:5000/',
      ChangeOrigin: true,
    }),
  );
};
