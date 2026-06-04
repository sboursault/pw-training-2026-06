import { expect, test } from "@playwright/test";

test.describe("Ajout au panier", () => {
  test("Ajout un produit depuis la page produit", async ({ page }) => {
    await page.goto("/fr/catalogue/i-robot_5/");

    const boutonPanier = page
      .locator("header")
      .getByRole("button", { name: "Panier" });

    await expect(boutonPanier).toHaveText(/^\s*Panier\s*$/);

    await page.getByRole("button", { name: "Ajouter au panier" }).click();

    await expect(page.getByText("a été ajouté à votre panier.")).toBeVisible();

    await expect(boutonPanier).toContainText("(1)");
  });
});
