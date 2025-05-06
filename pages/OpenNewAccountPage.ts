import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class OpenNewAccountPage extends BasePage {
    private buttonOpenNewAccount: Locator;
    private dropdownAccountType: Locator;
    private textValueNewAccountID: Locator;
    private dropdownFromAccountId: Locator;

    constructor(page: Page){
        super(page);
        this.buttonOpenNewAccount = page.getByRole('button', { name: 'Open New Account' });
        this.dropdownAccountType = page.locator('#type');
        this.dropdownFromAccountId = page.locator('#fromAccountId');
        this.textValueNewAccountID = page.locator("//a[@id='newAccountId']");
    }

    async createNewSavingsAccount(){
        await this.dropdownAccountType.selectOption('1');
        await this.dropdownFromAccountId.waitFor({ state: 'visible' });
        await this.dropdownFromAccountId.locator('option').first().waitFor({ state: 'attached' });
        await expect(this.dropdownFromAccountId.locator('option')).toHaveCount(1);
        await this.buttonOpenNewAccount.click();
    }

    async storeNewAccountIdValue(): Promise<string> {
        await this.textValueNewAccountID.waitFor({ state: 'visible' });
        const accountId = (await this.textValueNewAccountID.textContent())?.trim() || '';
        console.log('Captured New Account ID:', accountId);
        return accountId;
    }

    async verifyOpenNewAccountPageSuccessfullyLoaded(){
        await expect(this.page).toHaveURL(/.*\/parabank\/openaccount\.htm$/);
        await expect(this.page).toHaveTitle('ParaBank | Open Account');
        await expect(this.buttonOpenNewAccount).toBeVisible();
    }
}