import type { FastifyReply, FastifyRequest } from 'fastify';

export class AppError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(message: string, statusCode = 400, errorCode = 'BAD_REQUEST') {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export function notFoundHandler(request: FastifyRequest, reply: FastifyReply): void {
  reply.status(404).send({
    success: false,
    message: `Route not found: ${request.method} ${request.url}`,
    errorCode: 'NOT_FOUND',
  });
}
