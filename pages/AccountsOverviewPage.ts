import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountsOverviewPage extends BasePage {
    private headerTextAccountsOverview: Locator;

    constructor(page: Page){
        super(page);
        this.headerTextAccountsOverview = page.getByRole('heading', { name: 'Accounts Overview' });
    }

    async verifyAccountsOverviewPageSuccessfullyLoaded(){
        await expect(this.page).toHaveURL(/.*\/parabank\/overview\.htm$/);
        await expect(this.page).toHaveTitle('ParaBank | Accounts Overview');
        await expect(this.headerTextAccountsOverview).toBeVisible();
        console.log("Navigated Successfully to Accounts Overview Page!");
    }

    async assertNewAccountIdIsDisplayed(accountId: string) {
        await expect(this.page.locator(`//a[contains(text(), '${accountId}')]`)).toBeVisible();
    }
}