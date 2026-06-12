import { test, expect, Page } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';

test.beforeEach(async ({ page }: { page: Page }) => {
  const login = new LoginPage(page);
  await login.goto('https://www.saucedemo.com/');
});

test('Login exitoso', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.login('standard_user', 'secret_sauce');
  await inventory.expectOnInventoryPage();
});

test('Login fallido con contraseña incorrecta', async ({ page }) => {
  const login = new LoginPage(page);

  await login.login('standard_user', 'contraseña_incorrecta');
  await login.expectErrorContains(
    'Username and password do not match any user in this service'
  );
});

test('Validación de campos obligatorios', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('', '');
  await login.expectErrorContains('Username is required');
});