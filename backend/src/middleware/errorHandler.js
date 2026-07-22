/**
 * Catch-all error handler. Put this last in the middleware chain.
 * Mongoose validation/cast/duplicate-key errors are translated into
 * clean 400s instead of leaking stack traces to the client.
 */
export function errorHandler(err, req, res, next) {
  console.error(err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  // Mongoose duplicate key (e.g. email already registered)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(409).json({ message: `That ${field} is already registered.` });
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid identifier." });
  }

  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Something went wrong on the server.",
  });
}

export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}
