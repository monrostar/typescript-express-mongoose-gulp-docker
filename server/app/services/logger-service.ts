import ILoggerService = require("../../config/middlewares/loggers/interfaces/i-logger-service");
import ILogger = require("../../config/middlewares/loggers/interfaces/i-logger");

class LoggerService implements ILoggerService {

  public _logger: ILogger;

  constructor(logger: ILogger) {
    this._logger = logger;
  };

  public log(data : any) : void {
    this._logger.writeLogs(data);
  }

  public debug(data : any) : void {
    this._logger.writeDebug(data);
  }

}

export = LoggerService;