
import { Page, expect } from '@playwright/test';

export class PageLogin {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.getByLabel('Adresse électronique').fill(email);
    await this.page.getByLabel('Mot de passe').fill(password);
    await this.page.getByRole('button', { name: 'Connexion' }).click();
  }

  get errorMessage() {
    return this.page.getByText("Saisissez un nom d");
    return this.page.getByText("utilisateur et un mot de passe valides.");
  }
}