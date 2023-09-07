const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  const target = process.env.REACT_SERVER_TARGET;
  if (!target) {
    return;
  }
  app.use(
    ['/test'],
    createProxyMiddleware({
      target,
      changeOrigin: true,
      logLevel: 'debug',
      secure: true,
    }),
  );
};
