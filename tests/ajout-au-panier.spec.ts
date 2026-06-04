import { expect, test } from "@playwright/test";
import { ProductPage } from "../support/pom/page-produit";

test.describe("Ajout au panier", () => {


 test("Ajout un produit depuis la page produit", async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto("i-robot_5");

    await productPage.attendrePanierVide();

    await productPage.ajouterAuPanier();

    await productPage.attendreConfirmationAjout();

    await productPage.attendreNombreArticles(1);
  });
});
