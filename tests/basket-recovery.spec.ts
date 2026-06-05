import { test, expect } from "../support/fixtures";

test.describe("Récupération du panier", () => {
  test("Le panier est restauré après déconnexion/reconnexion", async ({
    productPage,
    basketApi,
    workflow,
  }) => {
    // vide le panier via API
    await basketApi.clearBasket("tom@test.test", "tom@test.test");

    // mon panier est vide
    await productPage.goto("i-robot_5");
    await productPage.attendrePanierVide();

    // je me connecte
    await workflow.login("tom@test.test", "tom@test.test");

    // j'ajoute un produit au panier
    await productPage.goto("i-robot_5");
    await productPage.ajouterAuPanier();
    await productPage.attendreConfirmationAjout();

    // -> mon panier contient un produit
    await productPage.attendreNombreArticles(1);

    // je me déconnecte
    await workflow.logout();

    // -> mon panier est vide
    await productPage.goto("i-robot_5");
    await productPage.attendrePanierVide();

    // je me reconnecte
    await workflow.login("tom@test.test", "tom@test.test");

    // -> mon panier contient un produit
    await productPage.goto("i-robot_5");
    await productPage.attendreNombreArticles(1);
  });
});
