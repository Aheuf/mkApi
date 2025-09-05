import { Request, Response, NextFunction } from "express";
import { NotFoundError, UnauthorizedError } from "../errors";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  }
  if (err instanceof UnauthorizedError) {
    res.status(403).send();
    return;
  }
  if (err instanceof NotFoundError) {
    res.status(404).send();
    return;
  }

  err instanceof Error ? res.status(500).json({ message: err.message }) : res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
};
