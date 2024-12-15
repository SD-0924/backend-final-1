import logger from "./src/logger";

// Redirect console methods to Winston
global.console.log = (message?: any, ...optionalParams: any[]) => {
  logger.info(message, { optionalParams });
};

global.console.error = (message?: any, ...optionalParams: any[]) => {
  logger.error(message, { optionalParams });
};

global.console.warn = (message?: any, ...optionalParams: any[]) => {
  logger.warn(message, { optionalParams });
};

global.console.debug = (message?: any, ...optionalParams: any[]) => {
  logger.debug(message, { optionalParams });
};
