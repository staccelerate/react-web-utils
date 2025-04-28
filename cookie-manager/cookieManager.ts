class CookieManager {
  private static myInstance: CookieManager | null = null;
  private constructor() {}

  public static getSingeltonInstance(): CookieManager {
    if (!CookieManager.myInstance) {
      CookieManager.myInstance = new CookieManager();
    }
    return CookieManager.myInstance;
  }

  public setCookie(name: string, value: string, daysToLive?: number): void {
    let expires = "";
    if (daysToLive !== undefined) {
      const date = new Date();
      date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
  }

  public getCookie(name: string): string | null {
    const cookieDecode: string = decodeURIComponent(document.cookie);
    const cookieArray: string[] = cookieDecode.split(";");
    let result: string = "";

    cookieArray.forEach((element) => {
      if (element.indexOf(name) == 0) {
        result = element.substring(name.length + 1);
      }
    });
    return result;
  }

  public deleteCookie(name: string): void {
    this.setCookie(name, "", 0);
  }

  public getAllCookies(): Record<string, string> {
    const cookies: Record<string, string> = {};
    document.cookie.split(";").forEach((cookieStr) => {
      const [key, value] = cookieStr.trim().split("=");
      if (key && value !== undefined) {
        cookies[key] = decodeURIComponent(value);
      }
    });
    return cookies;
  }
}

export default CookieManager;
