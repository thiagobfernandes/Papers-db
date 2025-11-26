

export class ExceptionDTO extends Error {
  messageDev?: string;
  statusCode: number;
  method?: string;

  constructor(exception: ExceptionDTO) {
    super();
    this.message = exception.message;
    this.messageDev = exception.messageDev;
    this.statusCode = exception.statusCode;
    this.method = exception.method;
  }

 
}
