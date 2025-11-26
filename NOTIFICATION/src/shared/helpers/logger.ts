export enum LogLevel {
    INFO = '[INFO]',
    WARN = '[WARN]',
    ERROR = '[ERROR]',
    DEGUG = '[DEBUG]'
}

export class Logger {

    private static log(level: LogLevel, message: string): void {
        const messageReplace = message.replace(/\n/g, ' ')
        console.log(`[${new Date().toISOString()}] [${level}] ${messageReplace}`);
    }
    public static info(message: string): void {
        this.log(LogLevel.INFO, message);
    }
    public static warn(message: string): void {
        this.log(LogLevel.WARN, message);
    }
    public static error(message: string): void {
        this.log(LogLevel.ERROR, message);
    }


}