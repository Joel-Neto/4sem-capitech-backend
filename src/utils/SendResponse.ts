import { Response } from 'express';

export default class SendResponse {
  static success<T>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res: Response, statusCode: number, message: string) {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
}
