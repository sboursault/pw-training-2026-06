
import { test, expect } from '@playwright/test';
import { PageLogin } from '../support/pom/page-login';
import { HomePage } from '../support/pom/page-accueil';


test.describe('Login', () => {
  test('Connexion réussie avec identifiants valides', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new PageLogin(page);
    await homePage.gotoLogin();
    await loginPage.login('tom@test.test', 'tom@test.test');

    await expect(page).toHaveURL('/en-gb/catalogue/');
    await expect(homePage.welcomeMessage).toBeVisible();
    await expect(homePage.userEmail).toBeVisible();
  });

  test('Connexion échouée avec identifiants invalides', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new PageLogin(page);
    await homePage.gotoLogin();
    await loginPage.login('invalid@test.test', 'wrongpassword');
    await expect(loginPage.errorMessage).toBeVisible();
  });
});




