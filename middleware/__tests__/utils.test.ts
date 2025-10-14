import { hashPassword } from "../utils";

describe("utils test", () => {
    describe("hashPassword", () => {
        it("should hash the password", () => {
            const password = "testPassword";
            const hashedPassword = hashPassword(password);
            expect(hashedPassword).not.toBe(password);
        });
    });
});