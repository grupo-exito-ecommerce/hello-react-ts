interface ResolverErrorOptions {
  message: string;
  error?: ResolverError | Error;
  statusCode?: number;
}

export class ResolverError extends Error {
  public statusCode: number;
  public originalMessage: string;
  public originalError: ResolverError | Error | null;

  constructor({ message, error, statusCode }: ResolverErrorOptions) {
    super(message);
    this.name = 'ResolverError';
    this.statusCode = statusCode || 500;
    this.originalMessage = message;
    this.originalError = error || null;
    if (statusCode === 500) {
      this.message = 'Lo sentimos, ha ocurrido un error intenta más tarde.';
    }
    console.error(`Message ==> [${this.originalMessage}]:`);
    console.error('Original error ==>', this.originalError);
    console.error('Stack ==>', this.stack);
  }
}
