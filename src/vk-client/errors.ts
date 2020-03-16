interface ErrorsObject {
  statusCode: number;
  errorMessage: string;
}

class VkErrors extends Error {
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  public statusCode: number;

  toJson(): ErrorsObject {
    return {
      errorMessage: this.message,
      statusCode: this.statusCode,
    };
  }
}

export default VkErrors;
