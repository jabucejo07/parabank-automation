import { Locator } from '@playwright/test';

export async function retryClickUntilGone(locator: Locator, maxRetries: number = 3, delayMs: number = 1000): Promise<void> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`Attempt ${attempt} to click the element`);

    try {
      await locator.click({ timeout: 3000 });
    } catch (e) {
      console.warn(`Click attempt ${attempt} failed: ${e}`);
    }

    const stillVisible = await locator.isVisible();
    if (!stillVisible) {
      console.log('Element is gone after click.');
      return;
    }

    if (attempt < maxRetries) {
      await locator.page().waitForTimeout(delayMs);
    }
  }

  throw new Error(`Element still visible after ${maxRetries} attempts`);
}