import { test as base } from '@playwright/test';
import { HomePage } from './pom/page-accueil';
import { PageLogin } from './pom/page-login';
import { ProductPage } from './pom/page-produit';

// Declare the types of the fixtures
export interface PageFixtures {
  homePage: HomePage;
  loginPage: PageLogin;
  productPage: ProductPage;
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
});

export { expect } from '@playwright/test';
