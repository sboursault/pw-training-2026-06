import { test, expect } from "../support/fixtures";

test.describe("Frais de livraison", () => {

  test("Livraison gratuite pour un panier > 30€ (2 produits)", async ({
    productPage,
    basketPage,
  }) => {
    // Ajouter un premier produit au panier
    await productPage.goto("i-robot_5");
    await productPage.ajouterAuPanier();
    await productPage.attendreConfirmationAjout();

    // Ajouter un deuxième produit au panier (pour dépasser 30€)
    await productPage.goto("the-hitchhikers-guide-to-the-galaxy_4");
    await productPage.ajouterAuPanier();
    await productPage.attendreConfirmationAjout();

    // Aller sur la page panier
    await basketPage.goto();

    // Vérifier que la livraison est gratuite
    await basketPage.attendreLivraisonGratuite();
  });

  test("Frais de livraison fixes à 7,00 € pour un panier < 30€ (1 produit)", async ({
    productPage,
    basketPage,
  }) => {
    // Ajouter un seul produit au panier
    await productPage.goto("i-robot_5");
    await productPage.ajouterAuPanier();
    await productPage.attendreConfirmationAjout();

    // Aller sur la page panier
    await basketPage.goto();

    // Vérifier que les frais de livraison sont de 7,00 €
    await basketPage.attendreLivraisonPayante();
  });

  test("Livraison gratuite avec produit API à 30€", async ({
    productApi,
    productPage,
    basketPage,
  }) => {
    // Créer un produit à 30€ via API
    const response = await productApi.createProduct(
      "Livre à 30€",
      "livre-30e-test",
      30,
      "sku-livre-30e-" + Date.now()
    );

    // Récupérer l'id du produit
    const productId = (await response.json()).id;

    // Aller sur la page du produit et l'ajouter au panier
    await productPage.goto("livre-30e-test_" + productId);
    await productPage.ajouterAuPanier();
    await productPage.attendreConfirmationAjout();

    // Aller sur la page panier
    await basketPage.goto();

    // Vérifier que la livraison est gratuite
    await basketPage.attendreLivraisonGratuite();
  });
});
