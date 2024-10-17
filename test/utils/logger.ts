// file: test/utils/logger.ts

import fs from 'fs';
import path from 'path';

class TestLogger {
  private static instance: TestLogger;
  private logStream: fs.WriteStream;
  private static readonly LOG_DIR = '.test-logs';

  private constructor() {
    const timestamp = new Date().toISOString().replace(/[:]/g, '-').replace(/\..+/, '');
    
    // Ensure the log directory exists
    if (!fs.existsSync(TestLogger.LOG_DIR)) {
      fs.mkdirSync(TestLogger.LOG_DIR, { recursive: true });
    }

    const logFilePath = path.join(TestLogger.LOG_DIR, `test-log-${timestamp}.txt`);
    this.logStream = fs.createWriteStream(logFilePath, { flags: 'a' });
  }

  public static getInstance(): TestLogger {
    if (!TestLogger.instance) {
      TestLogger.instance = new TestLogger();
    }
    return TestLogger.instance;
  }

  public log(message: string): void {
    this.logStream.write(`LOG: ${message}\n`);
  }

  public warn(message: string): void {
    this.logStream.write(`WARNING: ${message}\n`);
  }

  public error(message: string): void {
    this.logStream.write(`ERROR: ${message}\n`);
  }

  public close(): void {
    this.logStream.end();
  }
}

export const logger = TestLogger.getInstance();