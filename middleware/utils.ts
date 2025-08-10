import bcrypt from 'bcryptjs';

export function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

export function isPasswordOk(password: string, playerPassword: string): Promise<boolean> {
    return bcrypt.compare(password, playerPassword);
}