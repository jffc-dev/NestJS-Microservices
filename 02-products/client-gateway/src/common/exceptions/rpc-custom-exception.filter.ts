/* eslint-disable @typescript-eslint/no-base-to-string */
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    const rpcError = exception.getError();

    if (rpcError.toString().includes('Empty response')) {
      return response.status(500).json({
        status: 500,
        message: 'Service unavailable',
      });
    }

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const { status, message } = rpcError as {
        status: number;
        message: string;
      };
      const resolvedStatus: number = isNaN(status) ? 400 : Number(status);
      return response.status(resolvedStatus).json({
        status: resolvedStatus,
        message: message,
      });
    }

    response.status(401).json({
      status: 401,
      message: rpcError,
    });
  }
}
