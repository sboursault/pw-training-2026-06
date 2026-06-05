import { HomePage } from "./pom/page-accueil";
import { PageLogin } from "./pom/page-login";
import { expect, Page } from "@playwright/test";

export class Workflow {
  constructor(
    private page: Page,
    private homePage: HomePage,
    private loginPage: PageLogin,
  ) {}

  async login(username: string, password: string) {
    await this.homePage.gotoLogin();
    await this.loginPage.login(username, password);
    await expect(this.homePage.welcomeMessage).toBeVisible();
  }

  async logout() {
    await this.page.goto("/fr/catalogue/");
    await this.page.getByRole("button", { name: "tom@test.test" }).click();
    await this.page.getByRole("link", { name: /déconnexion|sign out/i }).click();
  }
  
}
