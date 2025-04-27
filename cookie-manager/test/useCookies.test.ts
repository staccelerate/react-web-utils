// test/useCookies.test.ts
import { renderHook, act } from "@testing-library/react-hooks";
import { useCookies } from "../hooks/useCookies"; // Fixed import name
import { cookieManager } from "../src/cookieManager";

jest.mock("../cookieManager");

const mockCookieManager = cookieManager as jest.Mocked<typeof cookieManager>;

describe("useCookies hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.cookie = "";
  });

  test("initializes with cookie value", () => {
    mockCookieManager.get.mockReturnValue("stored-value");
    const { result } = renderHook(() => useCookies("test_cookie"));
    expect(result.current[0]).toBe("stored-value");
  });
});
