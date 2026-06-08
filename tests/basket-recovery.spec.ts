import { test } from "../support/fixtures";

test.describe("Récupération du panier", () => {
  test("Le panier est restauré après déconnexion/reconnexion", async ({
    productPage,
    basketApi,
    userApi,
    workflow,
  }) => {
    const user = `user${new Date().getTime()}@my-domain.com`;
    const password = `user${new Date().getTime()}@my-domain.com`;

    // Créer un compte utilisateur
    await userApi.createUser(user, password);

    // mon panier est vide
    await productPage.goto("i-robot_5");
    await productPage.attendrePanierVide();

    // je me connecte
    await workflow.login(user, password);

    // j'ajoute un produit au panier
    await productPage.goto("i-robot_5");
    await productPage.ajouterAuPanier();
    await productPage.attendreConfirmationAjout();

    // -> mon panier contient un produit
    await productPage.attendreNombreArticles(1);

    // je me déconnecte
    await workflow.logout(user);

    // -> mon panier est vide
    await productPage.goto("i-robot_5");
    await productPage.attendrePanierVide();

    // je me reconnecte
    await workflow.login(user, password);

    // -> mon panier contient un produit
    await productPage.goto("i-robot_5");
    await productPage.attendreNombreArticles(1);
  });
});
