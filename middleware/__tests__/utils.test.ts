import { hashPassword, isPasswordOk } from "../utils";

describe("utils test", () => {
    describe("hashPassword", () => {
        it("should hash the password", async () => {
            const password = "testPassword";
            const hashedPassword = await hashPassword(password);
            expect(hashedPassword).not.toBe(password);
        });

        it("should return false for isPasswordOk with wrong password", async () => {
            const password = "testPassword";
            const wrongPassword = "wrongPassword";
            const hashedPassword = await hashPassword(password);
            const isMatch = await isPasswordOk(wrongPassword, hashedPassword);
            expect(isMatch).toBe(false);
        });

        it("should return true for isPasswordOk with correct password", async () => {
            const password = "testPassword";
            const hashedPassword = await hashPassword(password);
            const isMatch = await isPasswordOk(password, hashedPassword);
            expect(isMatch).toBe(true);
        });
    });
});