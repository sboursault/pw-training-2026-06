import { test, expect } from "../support/fixtures";

test.describe("Ajout au panier", () => {

  test("Ajout un produit depuis la page produit", async ({ productPage }) => {
    await productPage.goto("i-robot_5");

    await productPage.attendrePanierVide();

    await productPage.ajouterAuPanier();

    await productPage.attendreConfirmationAjout();

    await productPage.attendreNombreArticles(1);
  });
});
