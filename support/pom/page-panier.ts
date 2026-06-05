import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object de la page panier (/fr/basket/).
 * Expose les actions et assertions liées aux frais de livraison.
 */
export class BasketPage {
  readonly page: Page;
  readonly totalLivraison: Locator;

  constructor(page: Page) {
    this.page = page;
    this.totalLivraison = page.getByTestId('checkout.shipping_charge.amount');
  }

  /** Ouvre la page panier. */
  async goto() {
    await this.page.goto("/fr/basket/");
  }

  /** Vérifie que les frais de livraison sont gratuits (0,00 €). */
  async attendreLivraisonGratuite() {
    await expect(this.totalLivraison).toContainText("0,00 €");
  }

  /** Vérifie que les frais de livraison fixes sont de 7,00 €. */
  async attendreLivraisonPayante() {
    await expect(this.totalLivraison).toContainText("7,00 €");
  }
}
