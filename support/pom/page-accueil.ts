
import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async gotoLogin() {
    await this.page.goto('/fr/catalogue/');
    await this.page.getByRole('link', { name: 'Compte' }).click();
    await expect(this.page).toHaveURL(/.*login/);
  }

  get welcomeMessage() {
    return this.page.getByText(/bienvenue/i);
  }

  get userEmail() {
    return this.page.getByText('tom@test.test');
  }

}