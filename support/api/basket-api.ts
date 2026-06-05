import { APIRequestContext } from "@playwright/test";

export class BasketApi {
  readonly request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }
  async clearBasket(email: string, password: string) {
    const auth = Buffer.from(`${email}:${password}`).toString("base64");
    await this.request.delete("/api/basket/", {
      headers: { authorization: `Basic ${auth}` },
    });
  }
}
