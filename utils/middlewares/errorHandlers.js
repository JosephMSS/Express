const { config } = require("../../config");
const Sentry = require("@sentry/node");
Sentry.init({
  dsn: `https://${config.sentry.dns}.ingest.sentry.io/${config.sentry.id}`,
  tracesSampleRate: 1.0,
});
function logErrors(err, req, res, next) {
  Sentry.captureException(err);
  console.error(err.stack);
  next(err);
}
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).json({ error: err.message });
  } else {
    next(err);
  }
}
function errorHandler(err, req, res, next) {
  if (req.headersSent) {
    next(err);
  }
  if (!config.dev) {
    delete err.stack;
  }
  res.status(err.status || 500);
  res.render("error", { error: err });
}
module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler,
};
