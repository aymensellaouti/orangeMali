import { Request, Response } from 'express';

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: () => void,
) => {
  console.log(`IP = ${req.ip} et body = ${req.body}`);
  next();
};
