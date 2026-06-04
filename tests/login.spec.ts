
import { test, expect } from '../support/fixtures';


test.describe('Login', () => {
  test('Connexion réussie avec identifiants valides', async ({ page, homePage, loginPage }) => {
    await homePage.gotoLogin();
    await loginPage.login('tom@test.test', 'tom@test.test');

    await expect(page).toHaveURL('/en-gb/catalogue/');
    await expect(homePage.welcomeMessage).toBeVisible();
    await expect(homePage.userEmail).toBeVisible();
  });

  test('Connexion échouée avec identifiants invalides', async ({ page, homePage, loginPage }) => {
    await homePage.gotoLogin();
    await loginPage.login('invalid@test.test', 'wrongpassword');
    await expect(loginPage.errorMessage).toBeVisible();
  });
});




