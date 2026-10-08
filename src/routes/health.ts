import { NextFunction, Request, Response } from 'express';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[ERROR]', error.message);

  res.status(500).json({
    error: 'Internal Server Error',
    message: error.message,
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
};
