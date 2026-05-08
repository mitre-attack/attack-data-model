export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';
export type LogHandler = (level: Exclude<LogLevel, 'silent'>, message: string) => void;

export interface LoggerConfig {
  level?: LogLevel;
  handler?: LogHandler;
}

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  silent: 4,
};

const VALID_LOG_LEVELS = new Set<string>(Object.keys(LOG_LEVEL_PRIORITY));

function getDefaultLevel(): LogLevel {
  if (typeof process !== 'undefined' && process.env?.ADM_LOG_LEVEL) {
    const envLevel = process.env.ADM_LOG_LEVEL.toLowerCase();
    if (VALID_LOG_LEVELS.has(envLevel)) {
      return envLevel as LogLevel;
    }
  }
  return 'warn';
}

const defaultHandler: LogHandler = (level, message) => {
  switch (level) {
    case 'debug':
    case 'info':
      console.log(message);
      break;
    case 'warn':
      console.warn(message);
      break;
    case 'error':
      console.error(message);
      break;
  }
};

let currentLevel: LogLevel | undefined;
let currentHandler: LogHandler | undefined;

function getLevel(): LogLevel {
  return currentLevel ?? getDefaultLevel();
}

function getHandler(): LogHandler {
  return currentHandler ?? defaultHandler;
}

function shouldLog(level: Exclude<LogLevel, 'silent'>): boolean {
  return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[getLevel()];
}

export function configureLogger(config: LoggerConfig): void {
  if (config.level !== undefined) {
    currentLevel = config.level;
  }
  if (config.handler !== undefined) {
    currentHandler = config.handler;
  }
}

export function resetLogger(): void {
  currentLevel = undefined;
  currentHandler = undefined;
}

export const logger = {
  debug(message: string): void {
    if (shouldLog('debug')) getHandler()('debug', message);
  },
  info(message: string): void {
    if (shouldLog('info')) getHandler()('info', message);
  },
  warn(message: string): void {
    if (shouldLog('warn')) getHandler()('warn', message);
  },
  error(message: string): void {
    if (shouldLog('error')) getHandler()('error', message);
  },
};
