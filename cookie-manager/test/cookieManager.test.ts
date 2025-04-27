// test/cookieManager.test.ts
import { cookieManager } from "../src/cookieManager";

describe("CookieManager Singleton", () => {
  beforeEach(() => {
    // Properly clear all cookies
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.trim().split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
    });
  });

  describe("set()", () => {
    it("should set cookie with options", () => {
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);

      cookieManager.set("test", "value", {
        expires,
        path: "/path",
        domain: "example.com",
        secure: true,
        sameSite: "strict",
      });

      // Test each property separately
      expect(cookieManager.get("test")).toBe("value");
      expect(document.cookie).toContain("path=/path");
      expect(document.cookie).toContain("domain=example.com");
      expect(document.cookie).toContain("secure");
      expect(document.cookie).toContain("samesite=strict");
    });
  });

  describe("getAll()", () => {
    it("should return empty object when no cookies", () => {
      // Force clear cookies
      document.cookie = "";
      expect(cookieManager.getAll()).toEqual({});
    });
  });
});
