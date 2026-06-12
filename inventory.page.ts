import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
  }

  async expectOnInventoryPage() {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.title).toHaveText('Products');
  }
}
