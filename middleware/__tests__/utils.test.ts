import { hashPassword } from "../utils";

describe("utils test", () => {
    describe("hashPassword", () => {
        it("should hash the password", async () => {
            const password = "testPassword";
            const hashedPassword = await hashPassword(password);
            expect(hashedPassword).not.toBe(password);
        });
    });
});