import { test, expect } from "../support/fixtures";

test.describe("Récupération du panier", () => {
  test("Le panier est restauré après déconnexion/reconnexion", async ({
    page,
    request,
    homePage,
    loginPage,
    productPage,
    basketApi,
  }) => {
    // vide le panier via API
    await basketApi.clearBasket("tom@test.test", "tom@test.test");

    // mon panier est vide
    await productPage.goto("i-robot_5");
    await productPage.attendrePanierVide();

    // je me connecte
    await homePage.gotoLogin();
    await loginPage.login("tom@test.test", "tom@test.test");
    await expect(homePage.welcomeMessage).toBeVisible();

    // j'ajoute un produit au panier
    await productPage.goto("i-robot_5");
    await productPage.ajouterAuPanier();
    await productPage.attendreConfirmationAjout();

    // -> mon panier contient un produit
    await productPage.attendreNombreArticles(1);

    // je me déconnecte
    await page.goto("/fr/catalogue/");
    await page.getByRole("button", { name: "tom@test.test" }).click();
    await page.getByRole("link", { name: /déconnexion|sign out/i }).click();

    // -> mon panier est vide
    await productPage.goto("i-robot_5");
    await productPage.attendrePanierVide();

    // je me reconnecte
    await homePage.gotoLogin();
    await loginPage.login("tom@test.test", "tom@test.test");
    await expect(homePage.welcomeMessage).toBeVisible();

    // -> mon panier contient un produit
    await productPage.attendreNombreArticles(1);
  });
});
