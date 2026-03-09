import type { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { AppError } from '../errors/app-error.js';

export function registerErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      reply.status(400).send({
        success: false,
        message: '请求参数校验失败',
        errorCode: 'VALIDATION_ERROR',
        issues: error.issues,
      });
      return;
    }

    if (error instanceof AppError) {
      reply.status(error.statusCode).send({
        success: false,
        message: error.message,
        errorCode: error.errorCode,
      });
      return;
    }

    reply.status(500).send({
      success: false,
      message: error instanceof Error ? error.message : '服务器内部错误',
      errorCode: 'INTERNAL_ERROR',
    });
  });
}
