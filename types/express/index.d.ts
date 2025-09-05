import ROLE from "constants";

interface JwtUserPayload {
    username: string,
    role: ROLE
}

// Étends Express
declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}
