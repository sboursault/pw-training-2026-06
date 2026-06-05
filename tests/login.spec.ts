
import { test, expect } from '../support/fixtures';


test.describe('Login', () => {
  test('Connexion réussie avec identifiants valides', async ({ page, userApi, homePage, loginPage }) => {

    const user = `user${new Date().getTime()}@my-domain.com`;
    const password = `user${new Date().getTime()}@my-domain.com`;

    // Créer un compte utilisateur
    await userApi.createUser(user, password);

    await homePage.gotoLogin();
    await loginPage.login(user, password);

    await expect(page).toHaveURL('/en-gb/catalogue/');
    await expect(homePage.welcomeMessage).toBeVisible();
    await expect(homePage.getUserEmailButton(user)).toBeVisible();
  });

  test('Connexion échouée avec identifiants invalides', async ({ page, homePage, loginPage }) => {
    await homePage.gotoLogin();
    await loginPage.login('invalid@test.test', 'wrongpassword');
    await expect(loginPage.errorMessage).toBeVisible();
  });
});




