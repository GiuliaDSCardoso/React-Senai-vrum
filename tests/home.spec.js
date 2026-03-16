import { test, expect } from '@playwright/test';

test.describe('Home - LabMaker FSA', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');

  });

  // 1️⃣ Página carrega corretamente
  test('Página inicial carrega corretamente', async ({ page }) => {
    await expect(page).toHaveTitle(/LabMaker/i);
    await expect(page.locator('nav')).toBeVisible();
  });

  // 2️⃣ Header principal
  test('Header principal está visível', async ({ page }) => {
    await expect(page.getByText('BEM VINDO(a)')).toBeVisible();
  });

  // 3️⃣ Texto explicativo (desktop OU mobile)
  test('Texto explicativo aparece', async ({ page }) => {
    const texto = page.getByText(/solicitar veículos/i);
    await expect(texto.first()).toBeVisible();
  });

  // 4️⃣ Todos os cards estão visíveis
  test('Todos os cards estão visíveis', async ({ page }) => {
    await expect(page.getByText('Minhas')).toBeVisible();
    await expect(page.getByText('Solicitar')).toBeVisible();
    await expect(page.getByText('Viagens Programadas')).toBeVisible();
    await expect(page.getByText('Senha de abastecimento')).toBeVisible();
  });

  // 5️⃣ Navegação do card Minhas Solicitações
  test('Card "Minhas Solicitações" navega corretamente', async ({ page }) => {
    await page.getByRole('link', { name: /Minhas/i }).click();
    await expect(page).toHaveURL(/solicitarViagem/i);
  });

  // 6️⃣ Layout Mobile (iPhone 12)
  test('Layout mobile não quebra - iPhone', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();

    await expect(page.locator('nav')).toBeVisible();
    await expect(page.getByText('BEM VINDO(a)')).toBeVisible();
    await expect(page.getByText('Viagens Programadas')).toBeVisible();
  });

});
