export class RequestError extends Error {
  statusCode: number
  constructor(msg?: string, code?: number) {
    super(msg)
    this.statusCode = code
  }
}
