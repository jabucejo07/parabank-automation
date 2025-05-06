import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransferFundsPage extends BasePage {
    private buttonTransfer: Locator;
    private textFieldAmount: Locator;
    private dropdownFromAccountId: Locator;
    private dropdownToAccountId: Locator;
    private headerTextTransferComplete: Locator;

    constructor(page: Page){
        super(page);
        this.buttonTransfer = page.getByRole('button', { name: 'Transfer' });
        this.dropdownFromAccountId = page.locator('#fromAccountId');
        this.dropdownToAccountId = page.locator('#toAccountId');
        this.textFieldAmount = page.locator('#amount');
        this.headerTextTransferComplete = page.getByRole('heading', { name: 'Transfer Complete!' });
    }

    async transferFundsToAnotherAccount(accountId: string, amount: string){
        await this.textFieldAmount.fill(amount);
        await this.dropdownFromAccountId.selectOption(accountId);
        await this.dropdownToAccountId.waitFor({ state: 'visible' });
        await this.dropdownToAccountId.locator('option').first().waitFor({ state: 'attached' });
        await this.buttonTransfer.click();
    }

    async verifyTransferFundsPageSuccessfullyLoaded(){
        await expect(this.page).toHaveURL(/.*\/parabank\/transfer\.htm$/);
        await expect(this.page).toHaveTitle('ParaBank | Transfer Funds');
        await expect(this.buttonTransfer).toBeVisible();
    }

    async verifyTransferFundsIsSuccessful(amount: string, message: string){
        await expect(this.page.getByRole('heading', { name: `${message}` })).toBeVisible();
        await expect(this.page.getByText(`$${amount}.00 has been transferred`)).toBeVisible();
    }
}