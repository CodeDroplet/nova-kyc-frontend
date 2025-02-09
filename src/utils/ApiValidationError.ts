class ApiValidationError extends Error {
  constructor(message: string, public errors: { field: string; message: string }[]) {
    super(message);
    this.name = "ApiValidationError";
    Object.setPrototypeOf(this, ApiValidationError.prototype);
  }

  getErrorMessage(fieldName: string): string {
    return this.errors.find((error) => error.field === fieldName)?.message || "";
  }

  getErrors(): { field: string; message: string }[] {
    return this.errors;
  }

  getFormattedErrors(): Record<string, string> {
    return this.errors.reduce((acc, error) => {
      acc[error.field] = error.message;
      return acc;
    }, {} as Record<string, string>);
  }

  toString(): string {
    return `${this.name}: ${this.message} - ${JSON.stringify(this.errors)}`;
  }
}

export default ApiValidationError;
