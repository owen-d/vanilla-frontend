export class RequestError extends Error {
  statusCode: number = 500
  constructor(msg?: string, code?: number) {
    super(msg)
    if (code) {
      this.statusCode = code
    }
  }
}
