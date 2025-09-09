import { Request, Response, NextFunction } from "express";
import { NotFoundError, ForbiddenError, UsernameTakenError, WrongCredentialsError } from "../errors";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  }
  switch (err.constructor) {
    case ForbiddenError:
      return res.status(403).send(err.message);
    case NotFoundError:
      return res.status(404).send(err.message);
    case WrongCredentialsError:
    case UsernameTakenError:
      return res.status(400).send(err.message);
  }

  err instanceof Error ? res.status(500).json({ message: err.message }) : res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
};
