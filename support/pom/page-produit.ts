import { expect, Locator, Page } from "@playwright/test";

/**
 * Page Object de la page produit (Django Oscar).
 *
 * Représente une fiche produit du catalogue, p. ex. /fr/catalogue/i-robot_5/,
 * et expose les actions et assertions liées à l'ajout au panier.
 */
export class ProductPage {
  readonly page: Page;
  readonly boutonPanier: Locator;
  readonly boutonAjouter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.boutonPanier = page
      .locator("header")
      .getByRole("button", { name: /Panier|Basket/ });
    this.boutonAjouter = page.getByRole("button", {
      name: "Ajouter au panier",
    });
  }

  /** Ouvre la fiche produit identifiée par son slug, p. ex. "i-robot_5". */
  async goto(slug: string) {
    await this.page.goto(`/fr/catalogue/${slug}/`);
  }

  /** Ajoute le produit affiché au panier. */
  async ajouterAuPanier() {
    await this.boutonAjouter.click();
  }

  /** Vérifie que le panier du header est vide. */
  async attendrePanierVide() {
    await expect(this.boutonPanier).toHaveText(/^\s*Panier\s*$/);
  }

  /** Vérifie que la confirmation d'ajout est affichée. */
  async attendreConfirmationAjout() {
    await expect(
      this.page.getByText("a été ajouté à votre panier."),
    ).toBeVisible();
  }

  /** Vérifie que le header indique le nombre d'articles attendu. */
  async attendreNombreArticles(nombre: number) {
    await expect(this.boutonPanier).toContainText(`(${nombre})`);
  }
}
