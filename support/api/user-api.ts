import { APIRequestContext } from "@playwright/test";

export class UserApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createUser(email: string, password: string) {
    const response = await this.request.post("/api/register/", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        password1: password,
        password2: password,
      },
    });

    return response;
  }
}
