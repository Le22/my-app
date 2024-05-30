import { hashPassword, isSamePassword } from "../src/lib/password";

describe("Test Password", () => {
  const password = "123456";
  it("-> should hash password", async () => {
    const hash = await hashPassword(password);
    expect(hash).not.toBe(password);
  });

  it("-> should compare password", async () => {
    const hash = await hashPassword(password);
    const result = await isSamePassword(password, hash);
    expect(result).toBe(true);
  });
});
