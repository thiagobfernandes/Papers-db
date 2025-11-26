import chalk from 'chalk';

export enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG'
}

export class Logger {

    private static log(level: LogLevel, message: string): void {
        const msg = message.replace(/\n/g, ' ');

        const colors = {
            INFO: chalk.cyan,
            WARN: chalk.yellow,
            ERROR: chalk.red,
            DEBUG: chalk.magenta
        };

        console.log(
            `[${new Date().toISOString()}] ${colors[level](`[${level}]`)} ${msg}`
        );
    }

    static info(msg: string) { this.log(LogLevel.INFO, msg); }
    static warn(msg: string) { this.log(LogLevel.WARN, msg); }
    static error(msg: string) { this.log(LogLevel.ERROR, msg); }
    static debug(msg: string) { this.log(LogLevel.DEBUG, msg); }
}
