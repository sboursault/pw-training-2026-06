import { test as base } from '@playwright/test';
import { HomePage } from './pom/page-accueil';
import { PageLogin } from './pom/page-login';
import { ProductPage } from './pom/page-produit';
import { BasketPage } from './pom/page-panier';
import { BasketApi } from './api/basket-api';
import { Workflow } from './workflow';



// Declare the types of the fixtures
export interface PageFixtures {
  homePage: HomePage;
  loginPage: PageLogin;
  productPage: ProductPage;
  basketPage: BasketPage;
  basketApi: BasketApi;
  workflow: Workflow;
}

// Extend the base test with custom fixtures
export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new PageLogin(page);
    await use(loginPage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  basketPage: async ({ page }, use) => {
    const basketPage = new BasketPage(page);
    await use(basketPage);
  },

  basketApi: async ({ request }, use) => {
    const basketApi = new BasketApi(request);
    await use(basketApi);
  },

  workflow: async ({ page, homePage, loginPage }, use) => {
    const workflow = new Workflow(page, homePage, loginPage);
    await use(workflow);
  },
});

export { expect } from '@playwright/test';
