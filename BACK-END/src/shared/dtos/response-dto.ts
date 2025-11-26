interface IResponseDTO {
  message: string;
  status: number;
  content: unknown;
  page?: number;
  pageSize?: number;
  total?: number;
}

export class ResponseDTO {
  public message: string;
  public status: number;
  public content: unknown;
  public page?: number;
  public pageSize?: number;
  public total?: number;

  constructor(response: IResponseDTO) {
    this.message = response.message;
    this.status = response.status;
    this.content = response.content;
    this.page = response.page;
    this.pageSize = response.pageSize;
    this.total = response.total;
  }
}
