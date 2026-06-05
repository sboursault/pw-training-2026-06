import { APIRequestContext } from "@playwright/test";

export class ProductApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createProduct(name: string, slug: string, price: number, partnerSku: string) {
    const auth = Buffer.from("superuser@example.com:testing").toString("base64");
    
    const response = await this.request.post("/api/admin/products/", {
      headers: {
        authorization: `Basic ${auth}`,
        "content-type": "application/json",
      },
      data: {
        name: name,
        slug: slug,
        product_class: "book",
        stockrecords: [
          {
            partner: "/api/admin/partners/1/",
            partner_sku: partnerSku,
            price_currency: "EUR",
            price: price,
            num_in_stock: 100,
          },
        ],
      },
    });

    return response;
  }
}
