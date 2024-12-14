import { createLogger, format, transports } from "winston";

// Define the log format
const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message, stack }) => {
    return stack
      ? `${timestamp} [${level}]: ${message} - ${stack}` // Log stack trace for errors
      : `${timestamp} [${level}]: ${message}`;
  })
);

// Create the logger instance
const logger = createLogger({
  level: "info", // Default log level
  format: logFormat,
  transports: [
    new transports.Console(), // Logs to the console
    new transports.File({ filename: "logs/error.log", level: "error" }), // Logs errors to a file
    new transports.File({ filename: "logs/combined.log" }), // Logs all messages to a file
  ],
  exceptionHandlers: [
    new transports.File({ filename: "logs/exceptions.log" }), // Uncaught exceptions
  ],
});

export default logger;
